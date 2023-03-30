const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Test Performer One', genre: 'Test Genre One', price: 40, day: 1, image: 'Test Image' });
    await testConcertOne.save();
  });

  it('should return concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  
  it('should return a concert by id', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    console.log('test', res.body)
    expect(res.body).to.not.be.null;
  });


  after(async () => {
    await Concert.deleteMany({});
  });
});