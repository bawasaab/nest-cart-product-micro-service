import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const createdUser = new this.productModel(createProductDto);
      return createdUser.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex.toString());
    }
  }

  async findAll() {
    try {
      const user = await this.productModel.find().exec();
      if (!user) {
        throw new NotFoundException('Product not found');
      }
      return user;
    } catch (ex) {
      throw new InternalServerErrorException(ex.toString());
    }
  }

  async findOne(id: ObjectId) {
    try {
      const user = await this.productModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('Product not found');
      }
      return user;
    } catch (ex) {
      throw new InternalServerErrorException(ex.toString());
    }
  }

  async update(id: ObjectId, updateProductDto: UpdateProductDto) {
    try {
      const updatedUser = await this.productModel.findById(id).exec();
      if (!updatedUser) {
        throw new NotFoundException('Product not found');
      }
      if (updateProductDto.name) {
        updatedUser.name = updateProductDto.name;
      }
      if (updateProductDto.image) {
        updatedUser.image = updateProductDto.image;
      }
      if (updateProductDto.price) {
        updatedUser.price = +updateProductDto.price;
      }
      return updatedUser.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex.toString());
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.findOne(id);
      const user = await this.productModel.deleteOne({ _id: id }).exec();
      return user;
    } catch (ex) {
      throw new InternalServerErrorException(ex.toString());
    }
  }
}
