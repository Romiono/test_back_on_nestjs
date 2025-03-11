import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeliveryModel } from './models/delivery.model/delivery.model';
import { OrderModel } from '../orders/models/order.model/order.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto/update-delivery.dto';
import {ClientModel} from "../clients/models/client.model/client.model";

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectModel(DeliveryModel) private deliveryModel: typeof DeliveryModel,
    @InjectModel(OrderModel) private orderModel: typeof OrderModel,
  ) {}

  async create(dto: CreateDeliveryDto): Promise<DeliveryModel> {
    const order = await this.orderModel.findByPk(dto.orderId);
    if (!order) {
      throw new NotFoundException(`Заказ с ID ${dto.orderId} не найден`);
    }

    if (order.status !== 'paid') {
      throw new BadRequestException(
        'Заказ должен быть оплачен перед доставкой',
      );
    }

    const delivery = await this.deliveryModel.create({
      orderId: dto.orderId,
      deliveryDate: dto.deliveryDate,
      status: 'pending',
    });

    await order.update({ status: 'shipped' });

    return delivery;
  }

  async findAll(): Promise<DeliveryModel[]> {
    return await this.deliveryModel.findAll({ include: [OrderModel] });
  }

  async findOne(id: number): Promise<DeliveryModel> {
    const delivery = await this.deliveryModel.findByPk(id, {
      include: [OrderModel],
    });
    if (!delivery) {
      throw new NotFoundException(`Доставка с ID ${id} не найдена`);
    }
    return delivery;
  }

  async update(id: number, dto: UpdateDeliveryDto): Promise<DeliveryModel> {
    const delivery = await this.findOne(id);
    await delivery.update(dto);

    if (dto.status === 'delivered') {
      const order = await this.orderModel.findByPk(delivery.orderId);
      if (order) {
        await order.update({ status: 'completed' });
      }
    }

    return delivery;
  }

  async remove(id: number): Promise<void> {
    const delivery = await this.findOne(id);
    await delivery.destroy();
  }
}
