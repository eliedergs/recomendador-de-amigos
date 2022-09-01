import { IPerson } from '@/domain/interfaces/person.interface';
import { VALIDATIONS } from '@/infrastructure/utils/messages';
import { toStringWithOnlyNumbers } from '@/infrastructure/utils/transform';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePersonDto implements IPerson {
  @Expose()
  @IsNotEmpty({ message: VALIDATIONS.EMPTY })
  @MinLength(11, { message: VALIDATIONS.MIN_LENGTH('números') })
  @Transform(({ value }) => toStringWithOnlyNumbers(value))
  cpf: string;

  @IsNotEmpty({ message: VALIDATIONS.EMPTY })
  @Expose()
  nome: string;

  static toDto(data: IPerson) {
    return plainToInstance(
      CreatePersonDto,
      { ...data },
      { excludeExtraneousValues: true }
    );
  }
}
