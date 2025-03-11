import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OrderModel } from '../../../orders/models/order.model/order.model';
import {CreatePaymentDto} from "../../dto/create-payment.dto/create-payment.dto";
import {UpdatePaymentDto} from "../../dto/update-payment.dto/update-payment.dto";

type Dto = CreatePaymentDto | UpdatePaymentDto;
@Table({ tableName: 'payments' })
export class PaymentModel extends Model<PaymentModel, Dto> {
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
