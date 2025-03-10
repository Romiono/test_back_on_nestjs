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

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'polupanov_m',
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
