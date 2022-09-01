import { CreatePersonDto } from '@/application/dtos/person/create-person.dto';
import { faker } from '@faker-js/faker';

export class PersonMock {
  static createPersonDto(): CreatePersonDto {
    return {
      cpf: faker.random.numeric(11),
      nome: faker.name.fullName(),
    };
  }
}
