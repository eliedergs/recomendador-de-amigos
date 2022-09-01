import { IPerson } from '@/domain/interfaces/person.interface';
import PersonService from '@/domain/services/person.service';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import Storage from '@/infrastructure/storage';
import { describe } from '@jest/globals';
import { PersonMock } from '../../_fixtures/mocks/person.mock';

describe('Person service', () => {
  const personRepository = new BaseRepository<IPerson>('person');

  beforeAll(() => {
    Storage.initializeCache();
  });

  describe('addPerson', () => {
    it('Should add a new person to storage', () => {
      const person = PersonMock.createPersonDto();

      PersonService.addPerson(person);

      const _persons = Storage.get<IPerson[]>('person');
      expect(_persons.find((p) => p.cpf === person.cpf)).toMatchObject(person);
    });
  });

  describe('findPeople', () => {
    let people: IPerson[];

    beforeAll(() => {
      people = Array.from({ length: 3 }).map(() =>
        PersonMock.createPersonDto()
      );

      Storage.set<IPerson[]>('person', people);
    });

    it('Should find all created persons', () => {
      const _people = PersonService.findPeople();

      expect(_people?.length).toBe(people?.length);
    });
  });

  describe('findPersonByDocument', () => {
    let people: IPerson[];

    beforeAll(() => {
      people = Array.from({ length: 3 }).map(() =>
        PersonMock.createPersonDto()
      );

      Storage.set<IPerson[]>('person', people);
    });

    it('Should find a person by its document', () => {
      const person = PersonService.findPersonByDocument(people[0].cpf);

      expect(person).toMatchObject(people[0]);
    });
  });

  afterEach(() => {
    personRepository.clean();
  });
});
