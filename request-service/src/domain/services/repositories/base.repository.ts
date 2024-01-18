import { BaseEntity, BaseSchema } from 'domain/models';
import { BaseMapper } from '../mappers';
import { FilterQuery, Model } from 'mongoose';
import { FilterType, findAndCountAll } from 'infrastructure/database';
import { OrderEnum } from 'infrastructure/enum';

export abstract class BaseRepository<
  ModelType extends BaseSchema,
  EntityType extends BaseEntity,
> {
  constructor(
    private readonly mapper: BaseMapper<ModelType, EntityType>,
    private readonly model: Model<ModelType>,
  ) {}

  async count(where: FilterQuery<ModelType>): Promise<number> {
    return this.model.countDocuments(where);
  }

  async checkExistById(id: string): Promise<boolean> {
    const result = await this.model.findOne({ _id: id }, { _id: 1 });

    return !!result;
  }

  async findOne(where: FilterQuery<ModelType>): Promise<EntityType> {
    const result = await this.model.findOne(where);

    return this.mapper.convertSchemaToEntity(result as ModelType);
  }

  async findOneById(id: string): Promise<EntityType> {
    const result = await this.model.findById(id);

    return this.mapper.convertSchemaToEntity(result as ModelType);
  }

  async findAll(
    filter: FilterType<ModelType>,
  ): Promise<findAndCountAll<EntityType>> {
    if (!filter.where) filter.where = {};

    if (!filter.order) filter.order = [];

    filter.order.push(['_id', OrderEnum.DESC]);

    const result = await this.model
      .find(filter.where, filter.include)
      .sort(filter.order)
      .skip(filter.skip)
      .limit(filter.limit)
      .populate(filter.populate || []);
    const count = await this.model.countDocuments(filter.where);

    return {
      rows: result.map((x) =>
        this.mapper.convertSchemaToEntity(x as ModelType),
      ),
      count: count,
    };
  }
}
