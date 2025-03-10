import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentModel } from './models/payment.model/payment.model';
import { OrderModel } from '../orders/models/order.model/order.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentModel, OrderModel])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
