import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from './product.entity/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  getAll(@Param() params) {
    return this.service.getProducts();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getProduct(params.id);
  }

  @Post()
  create(@Body() product: ProductEntity) {
    return this.service.createProduct(product);
  }

  @Put()
  update(@Body() product: ProductEntity) {
    return this.service.updateProduct(product);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteProduct(params.id);
  }
}
