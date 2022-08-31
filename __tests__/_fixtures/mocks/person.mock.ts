import { CreatePersonDto } from '@/application/dtos/person/create-person.dto';
import { PersonEntity } from '@/domain/entities/person.entity';
import { faker } from '@faker-js/faker';
import { generateStringNumber } from '../utils/utils.fixture';

export class PersonMock {
  static createPersonDto(): CreatePersonDto {
    return {
      cpf: generateStringNumber(11),
      nome: faker.name.fullName(),
    };
  }

  static createPersonEntity(): PersonEntity {
    return new PersonEntity(PersonMock.createPersonDto());
  }
}
