import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from '../create-order.dto/create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  status?: 'new' | 'confirmed' | 'paid' | 'delivered' | 'canceled' | 'expired';
}
