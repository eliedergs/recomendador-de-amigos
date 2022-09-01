import { IPerson } from '@/domain/interfaces/person.interface';
import { IRelationship } from '@/domain/interfaces/relationship.interface';
import RelationshipService from '@/domain/services/relationship.service';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import Storage from '@/infrastructure/storage';
import { describe } from '@jest/globals';
import { PersonMock } from '../../_fixtures/mocks/person.mock';

describe('Recommendations service', () => {
  const personRepository = new BaseRepository<IPerson>('person');

  beforeAll(() => {
    Storage.initializeCache();
  });

  describe('getRecommendations', () => {
    let people: IPerson[];
    let relationships: IRelationship[];

    beforeAll(() => {
      people = Array.from({ length: 5 }).map(() =>
        PersonMock.createPersonDto()
      );
      relationships = [
        { cpf1: people[0].cpf, cpf2: people[1].cpf },
        { cpf1: people[0].cpf, cpf2: people[2].cpf },
        { cpf1: people[1].cpf, cpf2: people[3].cpf },
        { cpf1: people[2].cpf, cpf2: people[4].cpf },
        { cpf1: people[2].cpf, cpf2: people[3].cpf },
      ];

      Storage.set<IPerson[]>('person', people);
      Storage.set<IRelationship[]>('relationship', relationships);
    });

    it('Should get a relationship recommendation list', () => {
      const recommendations = RelationshipService.getRecommendations(
        people[0].cpf
      );

      expect(recommendations).toMatchObject([people[3].cpf, people[4].cpf]);
    });
  });

  afterEach(() => {
    personRepository.clean();
  });
});
