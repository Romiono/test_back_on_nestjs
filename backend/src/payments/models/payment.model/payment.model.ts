import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OrderModel } from '../../../orders/models/order.model/order.model';

@Table({ tableName: 'payments' })
export class PaymentModel extends Model<PaymentModel> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => OrderModel)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  paymentDate: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}
