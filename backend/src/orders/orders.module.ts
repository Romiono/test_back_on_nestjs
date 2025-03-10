import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from '../clients/models/client.model/client.model';
import { OrderItemModel } from './models/order-item.model/order-item.model';
import { OrderModel } from './models/order.model/order.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [SequelizeModule.forFeature([OrderItemModel, OrderModel])],
})
export class OrdersModule {}
