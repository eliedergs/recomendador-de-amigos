import { CreatePersonDto } from '@/application/dtos/person/create-person.dto';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import { IPerson } from '../interfaces/person.interface';

class PersonService {
  private personRepository: BaseRepository<IPerson>;

  constructor() {
    this.personRepository = new BaseRepository<IPerson>('person');
  }

  addPerson(personDto: CreatePersonDto) {
    this.personRepository.add(personDto);
  }

  findPeople() {
    return this.personRepository.find();
  }

  findPersonByDocument(document: string) {
    return this.personRepository.findOne('cpf', document);
  }

  cleanAll() {
    return this.personRepository.clean();
  }
}

export default new PersonService();
