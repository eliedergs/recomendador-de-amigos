import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import { ITest } from './test.interface,';

export class TestRepository extends BaseRepository<ITest> {
  constructor() {
    super('test');
  }
}
