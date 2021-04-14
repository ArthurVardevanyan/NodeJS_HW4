const io = require('socket.io-client');

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../server');

const mockDB = require('./mockDB.test');

before(async () => mockDB.connect());

const Model = require('../models/model');

Model.createIndexes();

const socketURL = 'http://localhost:8080';

const options = {
  transports: ['websocket'],
  'force new connection': true,
};

describe('GET /', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).get('/').send();
    expect(res.status).to.equal(200);
  });
});

describe('Input test into DB', () => {
  it('should Echo Input', (done) => {
    const client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('Input', 'test');

      client1.on('Input', (data) => {
        expect(data).to.equal('test');
        client1.disconnect();
        done();
      });
    });
  });
});

describe('Delete test from DB', () => {
  it('should Echo Input', (done) => {
    const client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('del', 'test');
      client1.on('del', (data) => {
        expect(data).to.equal(1);
        client1.disconnect();
        done();
      });
    });
  });
});

describe('Clear Entire DB', () => {
  it('Insert Couple words then delete everything', (done) => {
    const client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('Input', 'test');
      client1.emit('Input', 'testing');
      setTimeout(() => (client1.emit('clear')), 15);

      client1.on('clear', (data) => {
        expect(data).to.equal(2);
        client1.disconnect();
        done();
      });
    });
  });
});

describe('Select Values', () => {
  it('Select test form t', (done) => {
    const client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('Input', 'test');
      setTimeout(() => (client1.emit('typingInput', 't')), 15);

      client1.on('typingInput', (data) => {
        expect(data[0].Name).to.equal('test');
        client1.disconnect();
        done();
      });
    });
  });
});

describe('Insert Duplicate', () => {
  it('Do Nothing', (done) => {
    const client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('Input', 'test');
      setTimeout(() => (client1.emit('Input', 'test')), 15);

      client1.on('Input', (data) => {
        expect(data).to.equal(null);
        client1.disconnect();
        done();
      });
    });
  });
});

describe('XSS Sanitize Input', () => {
  it('XSS Sanitize Input', (done) => {
    const client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('Input', '<script>test</script>');

      client1.on('Input', (data) => {
        expect(data).to.not.equal('<script>test</script>');
        client1.disconnect();
        done();
      });
    });
  });
});

describe('Select Random', () => {
  it('Select nothing form t', (done) => {
    const client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('Input', 'test');
      setTimeout(() => (client1.emit('typingInput', 'X')), 15);

      client1.on('typingInput', (data) => {
        expect(data).to.deep.equal([]);
        client1.disconnect();
        done();
      });
    });
  });
});
