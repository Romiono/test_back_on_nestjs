// products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './models/product.model/product.model';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel) private productModel: typeof ProductModel,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductModel> {
    return await this.productModel.create(dto);
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.productModel.findAll();
  }

  async findOne(id: number): Promise<ProductModel> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductModel> {
    const product = await this.findOne(id);
    await product.update(dto);
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }
}
