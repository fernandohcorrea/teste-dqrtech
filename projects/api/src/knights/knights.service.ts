import { UpdateKnightsDto } from './dtos/update-knights.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Knight } from 'src/databases/dqrtech/schemas/knight.schema';
import { CreateKnightsDto } from './dtos/create-knights.dto';
import { ObjectId } from 'mongodb';
import { FilterInterface } from './interfaces/filter-interface';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name, 'dqrtech') private knightModel: Model<Knight>,
  ) {}

  /**
   * Creates a new knight.
   *
   * @param   {CreateKnightsDto<Knight>}  createKnightsDto
   * @return  {Promise<Knight>}
   */
  public async create(createKnightsDto: CreateKnightsDto): Promise<Knight> {
    const knight = new this.knightModel(createKnightsDto);
    return knight.save();
  }

  /**
   * Finds a knights.
   *
   * @param   {FilterInterface<any>[]}  filter
   * @return  {Promise<any>[]}
   */
  public async find(filter?: FilterInterface): Promise<any[]> {
    let knightResult = [];

    const aggregations: PipelineStage[] = [
      {
        $addFields: {
          age: {
            $trunc: {
              $divide: [
                { $subtract: [new Date(), '$birthday'] },
                365 * 24 * 60 * 60 * 1000,
              ],
            },
          },
        },
      },
    ];

    if (filter?.heroes) {
      const filterHeroes = {
        $match: {
          age: {
            $gte: 7,
          },
        },
      };
      aggregations.push(filterHeroes);
    }

    if (filter?._id) {
      const filterId = {
        $match: {
          _id: new ObjectId(filter._id),
        },
      };
      aggregations.push(filterId);
    }

    const knights = await this.knightModel.aggregate(aggregations).exec();

    if (knights.length == 0) {
      return knightResult;
    }

    knightResult = knights.map((knight) => {
      const attack = this.calcAttack(knight);
      const exp = this.calcExp(knight);

      const ret = Object.assign(
        {
          attack,
          exp,
        },
        knight,
      );

      return ret;
    });

    return knightResult;
  }

  /**
   * Updates a knight.
   *
   * @param   {string}
   * @param   {UpdateKnightsDto}
   */
  public async update(
    id: string,
    updateKnightsDto: UpdateKnightsDto,
  ): Promise<void> {
    await this.knightModel.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { nickname: updateKnightsDto.nickname },
      },
    );
  }

  /**
   * Deletes a knight.
   *
   * @param   {string}   id
   */
  public async delete(id: string): Promise<void> {
    await this.knightModel.deleteOne({ _id: new ObjectId(id) });
  }

  /**
   * Calculates the attack of a knight.
   *
   * @param   {any}     knight
   * @return  {number}
   */
  private calcAttack(knight: any): number {
    const weapons = knight?.weapons || [];
    let equippedWeapon = null;
    const active_attribute = knight.attributes[knight.keyAttribute] || 0;
    let mod_attribute = 0;
    let attack = 0;

    for (const key in weapons) {
      if (Object.prototype.hasOwnProperty.call(weapons, key)) {
        const weapon = weapons[key];
        if (weapon?.equipped) {
          equippedWeapon = weapon;
          break;
        }
      }
    }

    switch (true) {
      case active_attribute >= 0 && active_attribute <= 8:
        mod_attribute = -2;
        break;

      case active_attribute >= 9 && active_attribute <= 10:
        mod_attribute = -1;
        break;

      case active_attribute >= 11 && active_attribute <= 12:
        mod_attribute = 0;
        break;

      case active_attribute >= 13 && active_attribute <= 15:
        mod_attribute = 1;
        break;

      case active_attribute >= 16 && active_attribute <= 18:
        mod_attribute = 2;
        break;

      case active_attribute >= 19 && active_attribute <= 20:
        mod_attribute = 3;
        break;

      default:
        mod_attribute = 0;
        break;
    }

    attack = 10 + mod_attribute + (equippedWeapon?.mod || 0);
    return attack;
  }

  /**
   * Calculates the experience of a knight.
   *
   * @param   {any}  knight
   * @return  {number}
   */
  private calcExp(knight): number {
    return Math.floor((knight.age - 7) * Math.pow(22, 1.45));
  }
}
