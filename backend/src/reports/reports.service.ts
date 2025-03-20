// reports/reports.service.ts
import {Injectable, Res} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from '../orders/models/order.model/order.model';
import { ReportFilterDto } from './dto/report-filter.dto/report-filter.dto';
import { ClientOrdersReportDto } from './dto/client-orders-report.dto/client-orders-report.dto';
import { Op, fn, col, Sequelize, where } from 'sequelize';
import {ClientModel} from "../clients/models/client.model/client.model";
import {OrderItemModel} from "../orders/models/order-item.model/order-item.model";
import {ProductModel} from "../products/models/product.model/product.model";
import * as ExcelJS from 'exceljs';  // Новый импорт для последних версий
import {Response} from "express";


@Injectable()
export class ReportsService {
  constructor(@InjectModel(OrderModel) private orderModel: typeof OrderModel) {}

  // Отчет о заказанных товарах, которые могут быть доставлены
  async getDeliverableOrdersReport(dto: ReportFilterDto) {
    const orders = await this.orderModel.findAll({
      where: {
        status: 'paid',
        [Op.and]: [where(fn('DATE', col('orderDate')), '=', dto.date)],
      },
      include: [
        {
          model: ClientModel,
          attributes: ['name'], // Берем только имя клиента
        },
        {
          model: OrderItemModel,
          include: [
            {
              model: ProductModel,
              attributes: ['id', 'name', 'price'], // Получаем детали товара
            },
          ],
        },
      ],
    });

    return orders.map((order) => ({
      orderId: order.id,
      clientName: order.client?.name, // Имя клиента
      totalAmount: order.totalAmount,
      products: order.orderItems.map((item) => ({
        productId: item.product?.id,
        productName: item.product?.name,
        price: item.product?.price,
        quantity: item.quantity,
      })),
    }));
  }

  async getDeliverableOrdersXlsx(dto: ReportFilterDto, res: Response) {
    const orders = await this.orderModel.findAll({
      where: {
        status: "paid",
        [Op.and]: [where(fn("DATE", col("orderDate")), "=", dto.date)],
      },
      include: [
        {
          model: ClientModel,
          attributes: ['name'], // Берем только имя клиента
        },
        {
          model: OrderItemModel,
          include: [
            {
              model: ProductModel,
              attributes: ['id', 'name', 'price'], // Получаем детали товара
            },
          ],
        },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Отчет");

    const columns = ["№ заказа", "Клиент", "Сумма заказа", "Товар", "Цена", "Количество"];
    worksheet.addRow(columns);

    orders.forEach((order) => {
      order.orderItems.forEach((item, index) => {
        const row = [
          index === 0 ? order.id : "",
          index === 0 ? order.client?.name : "",
          index === 0 ? order.totalAmount.toString() : "",
          item.product?.name,
          item.product?.price.toString(),
          item.quantity,
        ];
        worksheet.addRow(row);
      });
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=report-${dto.date}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  }


  async getClientOrdersReport(dto: ClientOrdersReportDto) {
    const orders = await this.orderModel.findAll({
      where: {
        clientId: dto.clientId,
        orderDate: { [Op.between]: [dto.startDate, dto.endDate] },
      },
    });

    return {
      paidOrders: orders
          .filter((o) => o.status === 'paid')
          .reduce((sum, o) => sum + 1, 0),
      deliveredOrders: orders
          .filter((o) => o.status === 'delivered')
          .reduce((sum, o) => sum + 1, 0),
      canceledOrders: orders
          .filter((o) => o.status === 'canceled')
          .reduce((sum, o) => sum + 1, 0),
    };
  }

  async getClientOrdersXlsx(dto: ClientOrdersReportDto, @Res() res: Response) {
    const orders = await this.orderModel.findAll({
      where: {
        clientId: dto.clientId,
        orderDate: { [Op.between]: [dto.startDate, dto.endDate] },
      },
      include: [{ all: true }],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Client Orders Report');

    worksheet.addRow([
      '№ заказа',
      'Дата заказа',
      'Статус',
      'Сумма заказа',
      'Товар',
      'Цена',
      'Количество',
    ]);

    orders.forEach((order) => {
      order.orderItems.forEach((item, index) => {
        worksheet.addRow([
          index === 0 ? order.id : '',
          index === 0 ? order.orderDate : '',
          index === 0 ? order.status : '',
          index === 0 ? order.totalAmount.toString() : '',
          item.product?.name,
          item.product?.price.toString(),
          item.quantity,
        ]);
      });
    });

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
        'Content-Disposition',
        `attachment; filename=client_orders_${dto.clientId}_${dto.startDate}-${dto.endDate}.xlsx`,
    );
    await workbook.xlsx.write(res);
    res.end();
  }

}
