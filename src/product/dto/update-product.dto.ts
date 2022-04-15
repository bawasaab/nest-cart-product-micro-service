import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ObjectId } from 'mongoose';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: ObjectId;
}
