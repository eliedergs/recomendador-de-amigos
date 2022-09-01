import { IPerson } from '@/domain/interfaces/person.interface';
import { IRelationship } from '@/domain/interfaces/relationship.interface';
import RelationshipService from '@/domain/services/relationship.service';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import Storage from '@/infrastructure/storage';
import { describe } from '@jest/globals';
import { PersonMock } from '../../_fixtures/mocks/person.mock';

describe('Relationship service', () => {
  const personRepository = new BaseRepository<IPerson>('person');

  beforeAll(() => {
    Storage.initializeCache();
  });

  describe('addRelationship', () => {
    let people: IPerson[];

    beforeAll(() => {
      people = Array.from({ length: 2 }).map(() =>
        PersonMock.createPersonDto()
      );

      Storage.set<IPerson[]>('person', people);
    });

    it('Should create a relationship between two existing people', () => {
      const dto = {
        cpf1: people[0].cpf,
        cpf2: people[1].cpf,
      };

      RelationshipService.addRelationship(dto);

      const _relationships = Storage.get<IRelationship[]>('relationship');
      expect(_relationships).toMatchObject([dto]);
    });
  });

  afterEach(() => {
    personRepository.clean();
  });
});
