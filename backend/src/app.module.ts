import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ReportsModule } from './reports/reports.module';
import { ClientModel } from './clients/models/client.model/client.model';
import { DeliveryModel } from './deliveries/models/delivery.model/delivery.model';
import { OrderModel } from './orders/models/order.model/order.model';
import { OrderItemModel } from './orders/models/order-item.model/order-item.model';
import { PaymentModel } from './payments/models/payment.model/payment.model';
import { ProductModel } from './products/models/product.model/product.model';
import * as process from "node:process";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        ClientModel,
        DeliveryModel,
        OrderModel,
        OrderItemModel,
        PaymentModel,
        ProductModel,
      ],
      autoLoadModels: true,
    }),
    ClientsModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    DeliveriesModule,
    ReportsModule,
  ],
})
export class AppModule {}
