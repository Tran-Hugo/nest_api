import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './category.entity/category.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()
  getAll(@Param() params) {
    return this.service.getCategories();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getCategory(params.id);
  }

  @Get(':id/products')
  getProductsByCategory(@Param() params) {
    return this.service.getProductsByCategory(params.id);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Post()
  create(@Body() category: CategoryEntity) {
    return this.service.createCategory(category);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Put()
  update(@Body() category: CategoryEntity) {
    return this.service.updateCategory(category);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteCategory(params.id);
  }
}
