import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/product.entity/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
    @Inject(ProductsService)
    private productsService: ProductsService,
  ) {}

  async getRepository(): Promise<Repository<CategoryEntity>> {
    return this.categoriesRepository;
  }

  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoriesRepository.find();
  }

  async getCategory(_id: number): Promise<CategoryEntity> {
    return await this.categoriesRepository.find({
      where: [{ id: _id }],
    })[0];
  }

  async createCategory(category: CategoryEntity) {
    return await this.categoriesRepository.save(category);
  }

  async updateCategory(category: CategoryEntity) {
    this.categoriesRepository.save(category);
  }

  async deleteCategory(category: CategoryEntity) {
    this.categoriesRepository.delete(category);
  }

  async getProductsByCategory(_id: number): Promise<ProductEntity[]> {
    const products = await this.productsService.getProductsByCategory(_id);

    return products;
  }
}
