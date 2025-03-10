// orders/orders.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderModel } from './models/order.model/order.model';
import { OrderItemModel } from './models/order-item.model/order-item.model';
import { ProductModel } from '../products/models/product.model/product.model';
import { ClientModel } from '../clients/models/client.model/client.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      OrderModel,
      OrderItemModel,
      ProductModel,
      ClientModel,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
