import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from '../create-payment.dto/create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  status?: 'pending' | 'completed' | 'failed';
}
