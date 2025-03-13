// reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from '../orders/models/order.model/order.model';
import { ReportFilterDto } from './dto/report-filter.dto/report-filter.dto';
import { ClientOrdersReportDto } from './dto/client-orders-report.dto/client-orders-report.dto';
import {Op, fn, col, Sequelize, where} from 'sequelize';


@Injectable()
export class ReportsService {
    constructor(@InjectModel(OrderModel) private orderModel: typeof OrderModel) {}

    // Отчет о заказанных товарах, которые могут быть доставлены
    async getDeliverableOrdersReport(dto: ReportFilterDto) {
        const orders = await this.orderModel.findAll({
            where: {
                status: 'paid',
                [Op.and]: [
                    where(fn('DATE', col('orderDate')), '=', dto.date)
                ]
            },
            include: [{ all: true }],
        });

        return orders.map(order => ({
            orderId: order.id,
            clientId: order.clientId,
            totalAmount: order.totalAmount,
        }));
    }

    // Отчет по клиентам за период
    async getClientOrdersReport(dto: ClientOrdersReportDto) {
        const orders = await this.orderModel.findAll({
            where: {
                clientId: { [Op.in]: dto.clientIds },
                orderDate: { [Op.between]: [dto.startDate, dto.endDate] },
            },
        });

        const result = dto.clientIds.map(clientId => {
            const clientOrders = orders.filter(order => order.clientId === clientId);
            return {
                clientId,
                paidOrders: clientOrders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.totalAmount, 0),
                deliveredOrders: clientOrders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.totalAmount, 0),
                canceledOrders: clientOrders.filter(o => o.status === 'canceled').reduce((sum, o) => sum + o.totalAmount, 0),
            };
        });

        return result;
    }
}
