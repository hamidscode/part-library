import { BaseEntity, BaseSchema } from 'domain/models';
import { BaseMapper } from '../mappers';
import { FilterQuery, Model, Types } from 'mongoose';

export abstract class BaseFactory<
  SchemeType extends BaseSchema,
  EntityType extends BaseEntity,
> {
  constructor(
    protected readonly mapper: BaseMapper<SchemeType, EntityType>,
    protected readonly model: Model<SchemeType>,
  ) {}

  async create(entity: EntityType): Promise<EntityType> {
    const schema = this.mapper.convertEntityToSchema(entity);

    const res = await this.model.create(schema);

    return this.mapper.convertSchemaToEntity(res as SchemeType);
  }

  async updateOne(
    entity: Partial<EntityType>,
    where: FilterQuery<SchemeType>,
  ): Promise<EntityType> {
    const model = this.mapper.convertEntityToSchema(entity as EntityType);

    delete model._id;

    const data = await this.model.findOneAndUpdate(
      where,
      { ...model, updated_at: new Date() },
      { new: true },
    );

    return this.mapper.convertSchemaToEntity(data);
  }

  async updateOneById(entity: Partial<EntityType>) {
    return this.updateOne(entity, { _id: new Types.ObjectId(entity.id) });
  }

  async destroyeOne(id: string): Promise<EntityType> {
    const data = await this.model.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    return this.mapper.convertSchemaToEntity(data as any);
  }
}
