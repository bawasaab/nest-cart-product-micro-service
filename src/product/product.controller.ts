import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'mongoose';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @MessagePattern('createProduct')
  create(@Param() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @MessagePattern('findAllProduct')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @MessagePattern('findOneProduct')
  findOne(@Param('id') id: ObjectId) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @MessagePattern('updateProduct')
  update(@Param() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @Delete(':id')
  @MessagePattern('removeProduct')
  remove(@Param('id') id: ObjectId) {
    return this.productService.remove(id);
  }
}
