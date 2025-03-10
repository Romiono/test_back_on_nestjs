import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from '../orders/models/order.model/order.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
