import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { CreateProductDto } from '../../dto/create-product.dto/create-product.dto';

@Table({ tableName: 'products' })
export class ProductModel extends Model<ProductModel, CreateProductDto> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stock: number;
}
