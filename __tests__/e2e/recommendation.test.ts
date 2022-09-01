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

  describe('GET', () => {
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

      personRepository.add(people);
      relationshipRepository.add(relationships);
    });

    it('Should send a cpf and return 200 with relationship recommendations', async () => {
      const { status, body } = await api
        .get('/recommendations/' + people[0].cpf)
        .send();

      expect(status).toBe(HttpStatusCode.OK);
      expect(body).toMatchObject([people[3].cpf, people[4].cpf]);
    });

    it('Should send a cpf with less than 11 characters and return 400', async () => {
      const { status } = await api.get('/recommendations/1234567').send();

      expect(status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('Should send a cpf not added and return 404', async () => {
      const person = PersonMock.createPersonDto();

      const { status } = await api.get('/recommendations/' + person.cpf).send();
      expect(status).toBe(HttpStatusCode.NOT_FOUND);
    });

    afterAll(() => {
      personRepository.clean();
      relationshipRepository.clean();
    });
  });

  afterAll(async () => {
    if (server?.listening) await server.close();
  });
});
