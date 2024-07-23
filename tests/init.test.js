import supertest from 'supertest';
import chai from 'chai';
import api from '../server';

global.app = api;
global.request = supertest(api);
global.expect = chai.expect;
global.assert = chai.assert;

describe('Server Initialization', () => {
  it('should have a running server', (done) => {
    global.request.get('/')
      .expect(200, done); // Assuming the root endpoint returns a 200 status
  });
});
