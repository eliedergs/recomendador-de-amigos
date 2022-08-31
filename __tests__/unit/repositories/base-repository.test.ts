import Storage from '@/infrastructure/storage';
import { faker } from '@faker-js/faker';
import { describe } from '@jest/globals';
import { ITest } from '../../_fixtures/misc/test.interface,';
import { TestRepository } from '../../_fixtures/misc/test.repository';

describe('Base repository', () => {
  let testRepository: TestRepository;

  beforeAll(() => {
    Storage.initializeCache();
    testRepository = new TestRepository();
  });

  describe('add', () => {
    it('Should add data to its respective storage bunch key', () => {
      const item: ITest = {
        id: faker.random.alphaNumeric(12),
      };

      testRepository.add(item);

      const data = Storage.get<ITest[]>('test');
      expect(data).toMatchObject([item]);
    });
  });

  describe('find', () => {
    let item: ITest;

    beforeEach(() => {
      item = {
        id: faker.random.alphaNumeric(5),
      };

      Storage.set<ITest[]>('test', [item]);
    });

    it('Should find data from its respective storage bunch key', () => {
      const data = testRepository.find();
      expect(data).toMatchObject([item]);
    });
  });

  describe('findOne', () => {
    let items: ITest[];

    beforeAll(() => {
      items = Array.from({ length: 3 }).map(() => ({
        id: faker.random.alphaNumeric(10),
      }));
      Storage.set<ITest[]>('test', items);
    });

    it('Should find an specific item from its respective storage bunch key', () => {
      const item = testRepository.findOne('id', items[0].id);

      expect(items[0]).toMatchObject(item);
    });
  });

  describe('delete', () => {
    let items: ITest[];

    beforeAll(() => {
      items = Array.from({ length: 3 }).map(() => ({
        id: faker.random.alphaNumeric(10),
      }));

      Storage.set<ITest[]>('test', [...items]);
    });

    it('Should delete an specific item from its respective storage bunch key', () => {
      testRepository.delete('id', items[0].id);

      const data = Storage.get<ITest[]>('test');
      expect(data.find((item) => item.id === items[0].id)).toBeFalsy();
    });
  });

  afterEach(() => {
    testRepository.clear();
  });
});
