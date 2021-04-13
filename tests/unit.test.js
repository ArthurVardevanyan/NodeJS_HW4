const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

const Service = require('../services/service');

const mockDB = require('./mockDB.test');

before(async () => mockDB.connect());

describe('GET Empty Database', () => {
  it('should return status nothing', async () => {
    const output = await Service.getAll();
    expect(output).to.deep.equal([]);
  });
});

describe('Delete Empty Database', () => {
  it('should return 0', async () => {
    const output = await Service.deleteAll();
    expect(output).to.equal(0);
  });
});

describe('Add test to DB', () => {
  it('should return test', async () => {
    const output = (await Service.post({ Name: 'test' })).Name;
    expect(output).to.equal('test');
  });
});

describe('Get test from T', () => {
  it('should return test', async () => {
    const output = await Service.getStartsWith('t');
    expect(output[0].Name).to.equal('test');
  });
});

describe('Delete test from DB', () => {
  it('should return 1', async () => {
    const output = await Service.deleteString('test');
    expect(output).to.equal(1);
  });
});
