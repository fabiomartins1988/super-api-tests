require('dotenv').config()
import { describe } from 'mocha';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1/');
import { expect } from 'chai';

const { TOKEN_API } = process.env
const TOKEN = TOKEN_API

describe('Users', () => {
  it('GET /users', (done) => {
    request.get(`users?access-token=${TOKEN}`).end((err, res) => {
      expect(res.body.data).to.not.be.empty;
      done();
    });
  });
});
