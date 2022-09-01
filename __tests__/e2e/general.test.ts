import { initServer } from '@/app';
import { IPerson } from '@/domain/interfaces/person.interface';
import { IRelationship } from '@/domain/interfaces/relationship.interface';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { describe } from '@jest/globals';
import { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import { PersonMock } from '../_fixtures/mocks/person.mock';

describe('Recommendation e2e', () => {
  let server: Server;
  let api: SuperTest<Test>;
  let personRepository = new BaseRepository<IPerson>('person');
  let relationshipRepository = new BaseRepository<IRelationship>(
    'relationship'
  );

  beforeAll(async () => {
    ({ server } = await initServer());
    api = supertest(server);
  });

  describe('DELETE', () => {
    beforeAll(() => {
      const people = Array.from({ length: 5 }).map(() =>
        PersonMock.createPersonDto()
      );
      const relationships = [
        { cpf1: people[0].cpf, cpf2: people[1].cpf },
        { cpf1: people[0].cpf, cpf2: people[2].cpf },
        { cpf1: people[1].cpf, cpf2: people[3].cpf },
        { cpf1: people[2].cpf, cpf2: people[4].cpf },
        { cpf1: people[2].cpf, cpf2: people[3].cpf },
      ];

      personRepository.add(people);
      relationshipRepository.add(relationships);
    });

    it('Should clean all data and return 200', async () => {
      const { status } = await api.delete('/clean/').send();
      const people = personRepository.find();
      const relationships = relationshipRepository.find();

      expect(status).toBe(HttpStatusCode.OK);
      expect(people.length).toBe(0);
      expect(relationships.length).toBe(0);
    });
  });

  afterAll(async () => {
    if (server?.listening) await server.close();
  });
});
