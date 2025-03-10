import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryModel } from './models/delivery.model/delivery.model';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  imports: [SequelizeModule.forFeature([DeliveryModel])],
})
export class DeliveriesModule {}
