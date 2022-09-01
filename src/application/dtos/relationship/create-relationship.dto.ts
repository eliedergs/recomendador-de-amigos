import { IRelationship } from '@/domain/interfaces/relationship.interface';
import { VALIDATIONS } from '@/infrastructure/utils/messages';
import { toStringWithOnlyNumbers } from '@/infrastructure/utils/transform';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateRelationshipDto implements IRelationship {
  @Expose()
  @IsNotEmpty({ message: VALIDATIONS.EMPTY })
  @MinLength(11, { message: VALIDATIONS.MIN_LENGTH('números') })
  @Transform(({ value }) => toStringWithOnlyNumbers(value))
  cpf1: string;

  @Expose()
  @IsNotEmpty({ message: VALIDATIONS.EMPTY })
  @MinLength(11, { message: VALIDATIONS.MIN_LENGTH('números') })
  @Transform(({ value }) => toStringWithOnlyNumbers(value))
  cpf2: string;
}
