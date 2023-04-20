import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity/product.entity';
import { CategoryEntity } from 'src/categories/category.entity/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    return await this.productsRepository.find();
  }

  async getProduct(_id: number): Promise<ProductEntity> {
    return await this.productsRepository.findOne({
      where: [{ id: _id }],
    });
  }

  async createProduct(product: ProductEntity) {
    return await this.productsRepository.save(product);
  }

  async updateProduct(product: ProductEntity) {
    this.productsRepository.save(product);
  }

  async deleteProduct(product: ProductEntity) {
    this.productsRepository.delete(product);
  }

  async getProductsByCategory(_id: number): Promise<ProductEntity[]> {
    // const category = await this.categoriesRepository.findOne({
    //   where: [{ id: _id }],
    // });

    // const {} = await this.productsRepository.find({
    //   where: [{ category: { id: _id } }],
    //   relations: ['category'],
    // });

    return await this.productsRepository.find({
      where: [{ category: { id: _id } }],
    });
  }
}
