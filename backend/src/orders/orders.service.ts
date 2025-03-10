// orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './models/order.model/order.model';
import { OrderItemModel } from './models/order-item.model/order-item.model';
import { ProductModel } from '../products/models/product.model/product.model';
import { ClientModel } from '../clients/models/client.model/client.model';
import { CreateOrderDto } from './dto/create-order.dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel) private orderModel: typeof OrderModel,
    @InjectModel(OrderItemModel) private orderItemModel: typeof OrderItemModel,
    @InjectModel(ProductModel) private productModel: typeof ProductModel,
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderModel> {
    const order = await this.orderModel.create({
      clientId: dto.clientId,
      status: 'new',
      orderDate: new Date(),
      totalAmount: 0,
    } as OrderModel);

    let totalAmount = 0;
    for (const item of dto.orderItems) {
      const product = await this.productModel.findByPk(item.productId);
      if (!product || product.stock < item.quantity) {
        throw new NotFoundException(
          `Товар ID ${item.productId} не найден или недостаточно на складе`,
        );
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      await this.orderItemModel.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        subtotal,
      } as OrderItemModel);

      await product.update({ stock: product.stock - item.quantity });
    }

    await order.update({ totalAmount });
    return order;
  }

  async findAll(): Promise<OrderModel[]> {
    return await this.orderModel.findAll({
      include: [ClientModel, OrderItemModel],
    });
  }

  async findOne(id: number): Promise<OrderModel> {
    const order = await this.orderModel.findByPk(id, {
      include: [ClientModel, OrderItemModel],
    });
    if (!order) {
      throw new NotFoundException(`Заказ с ID ${id} не найден`);
    }
    return order;
  }

  async update(id: number, dto: UpdateOrderDto): Promise<OrderModel> {
    const order = await this.findOne(id);

    const { orderItems, ...updateData } = dto;
    await order.update(updateData);

    if (orderItems) {
      await this.orderItemModel.destroy({ where: { orderId: id } }); // Удаляем старые позиции заказа

      for (const item of orderItems) {
        await this.orderItemModel.create({
          orderId: id,
          productId: item.productId,
          quantity: item.quantity,
          subtotal:
            (await this.productModel.findByPk(item.productId))!.price *
            item.quantity,
        } as OrderItemModel);
      }
    }

    return this.findOne(id); // Возвращаем обновленный заказ с товарами
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await order.destroy();
  }
}
