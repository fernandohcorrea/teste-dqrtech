import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type KnightDocument = HydratedDocument<Knight>;

@Schema({
  collection: 'knights',
})
export class Knight {
  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop(
    raw([
      {
        name: { type: String },
        mod: { type: Number },
        attr: { type: String },
        equipped: { type: Boolean },
      },
    ]),
  )
  weapons: Record<string, any[]>;

  @Prop(
    raw({
      strength: { type: Number },
      dexterity: { type: Number },
      constitution: { type: Number },
      intelligence: { type: Number },
      wisdom: { type: Number },
      charisma: { type: Number },
    }),
  )
  attributes: Record<string, any>;

  @Prop({ type: String, default: 'strength' })
  keyAttribute: string;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
