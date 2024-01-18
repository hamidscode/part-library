import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class BaseSchema {
  _id: Types.ObjectId;

  @Prop({ type: Date, index: true, default: () => new Date() })
  created_at: Date;

  @Prop({ type: Date, default: () => new Date() })
  updated_at: Date;

  @Prop({ type: [String], required: false, index: true, default: [] })
  tags?: Array<string>;
}
