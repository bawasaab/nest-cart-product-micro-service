import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'mongoose';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @EventPattern('createProduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @MessagePattern({ cmd: 'findAllProduct' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @MessagePattern({ cmd: 'findOneProduct' })
  findOne(@Body('id') id: ObjectId) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @EventPattern('updateProduct')
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @Delete(':id')
  @EventPattern('removeProduct')
  remove(@Body('id') id: ObjectId) {
    return this.productService.remove(id);
  }
}
