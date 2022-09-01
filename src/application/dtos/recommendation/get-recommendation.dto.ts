import { IPerson } from '@/domain/interfaces/person.interface';
import { VALIDATIONS } from '@/infrastructure/utils/messages';
import { toStringWithOnlyNumbers } from '@/infrastructure/utils/transform';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class GetRecommendationDto implements Pick<IPerson, 'cpf'> {
  @Expose()
  @IsNotEmpty({ message: VALIDATIONS.EMPTY })
  @MinLength(11, { message: VALIDATIONS.MIN_LENGTH('números') })
  @Transform(({ value }) => toStringWithOnlyNumbers(value))
  cpf: string;
}
