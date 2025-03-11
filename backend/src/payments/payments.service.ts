import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentModel } from './models/payment.model/payment.model';
import { OrderModel } from '../orders/models/order.model/order.model';
import { CreatePaymentDto } from './dto/create-payment.dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(PaymentModel) private paymentModel: typeof PaymentModel,
    @InjectModel(OrderModel) private orderModel: typeof OrderModel,
  ) {}

  async create(dto: CreatePaymentDto): Promise<PaymentModel> {
    const order = await this.orderModel.findByPk(dto.orderId);
    if (!order) {
      throw new NotFoundException(`Заказ с ID ${dto.orderId} не найден`);
    }

    if (dto.amount !== order.totalAmount) {
      throw new BadRequestException(
        'Сумма платежа должна соответствовать сумме заказа',
      );
    }

    const payment = await this.paymentModel.create({
      orderId: dto.orderId,
      amount: dto.amount,
      status: 'pending',
    });

    // Обновляем статус заказа, если платёж успешен
    await order.update({ status: 'paid', paymentDueDate: new Date() });
    return payment;
  }

  async findAll(): Promise<PaymentModel[]> {
    return await this.paymentModel.findAll({ include: [OrderModel] });
  }

  async findOne(id: number): Promise<PaymentModel> {
    const payment = await this.paymentModel.findByPk(id, {
      include: [OrderModel],
    });
    if (!payment) {
      throw new NotFoundException(`Платёж с ID ${id} не найден`);
    }
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<PaymentModel> {
    const payment = await this.findOne(id);
    await payment.update(dto);

    // Если платеж завершился успешно, обновляем статус заказа
    if (dto.status === 'completed') {
      const order = await this.orderModel.findByPk(payment.orderId);
      if (order) {
        await order.update({ status: 'paid' });
      }
    }

    return payment;
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await payment.destroy();
  }
}
