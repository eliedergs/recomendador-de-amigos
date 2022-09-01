import { initServer } from '@/app';
import { IPerson } from '@/domain/interfaces/person.interface';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import { describe } from '@jest/globals';
import { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import { PersonMock } from '../_fixtures/mocks/person.mock';

describe('Person e2e', () => {
  let server: Server;
  let api: SuperTest<Test>;
  let personRepository = new BaseRepository<IPerson>('person');

  beforeAll(async () => {
    ({ server } = await initServer());
    api = supertest(server);
  });

  describe('POST', () => {
    let person: IPerson;

    beforeAll(() => {
      person = PersonMock.createPersonDto();
      personRepository.add(person);
    });

    it('Should send data to add a new person and return 200', async () => {
      const personDto = PersonMock.createPersonDto();
      const { status } = await api.post('/person').send(personDto);

      expect(status).toBe(200);
    });

    it(`Should send data to add an already existing person and return 400`, async () => {
      const { status } = await api.post('/person').send({ ...person });

      expect(status).toBe(400);
    });

    it(`Should send data with cpf less than 11 characters and return 400`, async () => {
      const person = PersonMock.createPersonDto();
      const { status } = await api
        .post('/person')
        .send({ ...person, cpf: '12345' });

      expect(status).toBe(400);
    });

    afterAll(() => {
      personRepository.clean();
    });
  });

  describe('GET', () => {
    let person: IPerson;

    beforeAll(() => {
      person = PersonMock.createPersonDto();
      personRepository.add(person);
    });

    it('Should send a cpf and return 200 with its respective person data', async () => {
      const { status, body } = await api.get('/person/' + person.cpf).send();

      expect(status).toBe(200);
      expect(body).toMatchObject(person);
    });

    it(`Should send a cpf of a nonexistent person and return 404`, async () => {
      const { status, body } = await api.get('/person/1234567').send();

      expect(status).toBe(404);
    });

    afterAll(() => {
      personRepository.clean();
    });
  });

  afterAll(async () => {
    if (server?.listening) await server.close();
  });
});
