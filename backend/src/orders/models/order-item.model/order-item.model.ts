import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OrderModel } from '../order.model/order.model';
import { ProductModel } from '../../../products/models/product.model/product.model';

@Table({ tableName: 'order_items' })
export class OrderItemModel extends Model<OrderItemModel> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => OrderModel)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @ForeignKey(() => ProductModel)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  subtotal: number;

  @BelongsTo(() => OrderModel)
  order: OrderModel;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}
