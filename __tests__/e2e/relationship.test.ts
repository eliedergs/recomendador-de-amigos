import { initServer } from '@/app';
import { IPerson } from '@/domain/interfaces/person.interface';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { describe } from '@jest/globals';
import { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import { PersonMock } from '../_fixtures/mocks/person.mock';

describe('Relationship e2e', () => {
  let server: Server;
  let api: SuperTest<Test>;
  let personRepository = new BaseRepository<IPerson>('person');

  beforeAll(async () => {
    ({ server } = await initServer());
    api = supertest(server);
  });

  describe('POST', () => {
    let persons: IPerson[];

    beforeAll(() => {
      persons = Array.from({ length: 2 }).map(() => {
        const _person = PersonMock.createPersonDto();
        personRepository.add(_person);

        return _person;
      });
    });

    it('Should send data to create a relationship and return 200', async () => {
      const { status } = await api.post('/relationship').send({
        cpf1: persons[0].cpf,
        cpf2: persons[1].cpf,
      });

      expect(status).toBe(HttpStatusCode.OK);
    });

    it(`Should send data to create a relationship with an nonexistent person and return 400`, async () => {
      const _person = PersonMock.createPersonDto();
      const { status } = await api.post('/relationship').send({
        cpf1: persons[0].cpf,
        cpf2: _person.cpf,
      });

      expect(status).toBe(HttpStatusCode.NOT_FOUND);
    });

    afterAll(() => {
      personRepository.clean();
    });
  });

  afterAll(async () => {
    if (server?.listening) await server.close();
  });
});
