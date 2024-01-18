import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { ReservationStatusEnum } from 'infrastructure/enum';

@Schema({
  id: true,
})
export class BookRequestSchema extends BaseSchema {
  @Prop({ type: String, required: true, index: true, unique: false })
  requester_name: string;

  @Prop({ type: String, required: true, index: true, unique: false })
  requested_book: string;

  @Prop({
    type: String,
    enum: ReservationStatusEnum,
    required: true,
    default: ReservationStatusEnum.Pending,
  })
  status: ReservationStatusEnum;

  @Prop({ type: Date, required: false })
  reserved_at: Date;

  @Prop({ type: Date, required: false })
  returned_at: Date;

  static getSchema() {
    const schema = SchemaFactory.createForClass(this);
    return schema;
  }
}
