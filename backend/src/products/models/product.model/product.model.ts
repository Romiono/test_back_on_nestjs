import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'products' })
export class ProductModel extends Model<ProductModel> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stock: number;
}
