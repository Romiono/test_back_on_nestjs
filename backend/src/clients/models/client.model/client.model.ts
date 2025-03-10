import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { OrderModel } from '../../../orders/models/order.model/order.model';
import { CreateClientDto } from '../../dto/create-client.dto/create-client.dto';

@Table({ tableName: 'clients' })
export class ClientModel extends Model<ClientModel, CreateClientDto> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.TEXT })
  address: string;

  @HasMany(() => OrderModel)
  orders: OrderModel[];
}
