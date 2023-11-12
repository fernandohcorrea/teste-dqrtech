import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateKnightsDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
