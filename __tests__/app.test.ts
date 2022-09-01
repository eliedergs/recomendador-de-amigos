import supertest from 'supertest';

import { describe, it } from '@jest/globals';
import { Server } from 'http';

import { initServer } from '../src/app';

describe('Global: initializations', () => {
  let server: Server;

  it('If server are enable after app initialization', async () => {
    ({ server } = await initServer());

    expect(server.listening).toBe(true);
    supertest(server).get('/').expect(200);
  });

  afterAll(async () => {
    if (server?.listening) await server.close();
  });
});
