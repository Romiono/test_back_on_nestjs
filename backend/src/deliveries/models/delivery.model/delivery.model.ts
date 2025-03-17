import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OrderModel } from '../../../orders/models/order.model/order.model';
import { CreateDeliveryDto } from '../../dto/create-delivery.dto/create-delivery.dto';
import { UpdateDeliveryDto } from '../../dto/update-delivery.dto/update-delivery.dto';

type Dto = CreateDeliveryDto | UpdateDeliveryDto;
@Table({ tableName: 'deliveries' })
export class DeliveryModel extends Model<DeliveryModel, Dto> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => OrderModel)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  deliveryDate: Date;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}
