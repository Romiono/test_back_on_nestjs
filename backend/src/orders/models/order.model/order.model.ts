import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ClientModel } from '../../../clients/models/client.model/client.model';
import { OrderItemModel } from '../order-item.model/order-item.model';
import { UpdateOrderDto } from '../../dto/update-order.dto/update-order.dto';
import { CreateOrderDto } from '../../dto/create-order.dto/create-order.dto';

type Dto = UpdateOrderDto | CreateOrderDto;

@Table({ tableName: 'orders' })
export class OrderModel extends Model<OrderModel, Dto> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => ClientModel)
  @Column({ type: DataType.INTEGER })
  clientId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  orderDate: Date;

  @Column({
    type: DataType.ENUM(
      'new',
      'confirmed',
      'paid',
      'delivered',
      'canceled',
      'expired',
    ),
    allowNull: false,
  })
  status: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  totalAmount: number;

  @Column({ type: DataType.DATE })
  paymentDueDate: Date;

  @BelongsTo(() => ClientModel)
  client: ClientModel;

  @HasMany(() => OrderItemModel)
  orderItems: OrderItemModel[];
}
