import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from '../clients/models/client.model/client.model';
import { PaymentModel } from './models/payment.model/payment.model';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [SequelizeModule.forFeature([PaymentModel])],
})
export class PaymentsModule {}
