import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from '../create-delivery.dto/create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  status?: 'pending' | 'shipped' | 'delivered' | 'failed';
}
