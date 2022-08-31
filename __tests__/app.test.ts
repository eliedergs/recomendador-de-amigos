import supertest from 'supertest';

import { describe, it } from '@jest/globals';
import { Server } from 'http';

import { initServer } from '../src/app';

describe('Global: initializations', () => {
    const _port = 3000;
    let _server: Server;

    it('If server are enable after app initialization', () => {
        const { app, server } = initServer();
        _server = server;

        expect(app).toBeDefined();
        supertest(_server).get('/').expect(200);
    });

    afterEach(async () => {
        if (_server?.listening) {
            await _server.close();
            _server = null;
        }
    });
});