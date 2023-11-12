import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class WeaponDto {
  @IsString()
  name: string;

  @IsNumber()
  mod: number;

  @IsString()
  attr: string;

  @IsBoolean()
  equipped: boolean;
}

class AttributesDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  strength: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  dexterity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  constitution: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  intelligence: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  wisdom: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  charisma: number;
}

export class CreateKnightsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @IsString()
  @IsOptional()
  keyAttribute: string;

  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => WeaponDto)
  weapons: WeaponDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AttributesDto)
  attributes: AttributesDto;
}
