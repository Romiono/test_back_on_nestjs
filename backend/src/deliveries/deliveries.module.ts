// deliveries/deliveries.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { DeliveryModel } from './models/delivery.model/delivery.model';
import { OrderModel } from '../orders/models/order.model/order.model';

@Module({
  imports: [SequelizeModule.forFeature([DeliveryModel, OrderModel])],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
