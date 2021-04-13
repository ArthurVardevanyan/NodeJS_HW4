const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
const app = require('../server');

const mockDB = require('./mockDB.test');

before(async () => mockDB.connect());

describe('GET /', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).get('/').send();
    expect(res.status).to.equal(200);
  });
});
