require('dotenv').config()
import { describe } from 'mocha';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1/');
import { expect } from 'chai';

const { TOKEN_API } = process.env

describe('Users', () => {
  it('GET /users', () => {
    return request.get(`users?access-token=${TOKEN_API}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });

  it('GET /users/:id', () => {
    return request.get(`users/87?access-token=${TOKEN_API}`).then((res) => {
      expect(res.body.data.id).to.be.eq(87);
    });
  });

  it('GET /users with query params', () => {
    const url = `users?access-token=${TOKEN_API}&page=5&gender=female&status=active`;

    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      expect(res.body.meta.pagination.page).to.be.eq(5);
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq('female');
        expect(data.status).to.eq('active');
      });
    });
  });

  it('POST /users', () => {
    const data = {
      email: `test-${Math.floor(Math.random() * 9000)}@someemail.com`,
      name: 'Test name',
      gender: 'male',
      status: 'inactive'
    };

    return request
      .post('users')
      .set('Authorization', `Bearer ${TOKEN_API}`)
      .send(data)
      .then((res) => {
        expect(res.body.data).to.deep.include(data);
      });
  });

  it('PUT /users/:id', () => {
    const data = {
      status: 'active',
      name: `Testoso - ${Math.floor(Math.random) * 9999}`
    };

    return request
      .put('users/150')
      .set('Authorization', `Bearer ${TOKEN_API}`)
      .send(data)
      .then((res) => {
        expect(res.body.data).to.deep.include(data);
      })
  });
});
