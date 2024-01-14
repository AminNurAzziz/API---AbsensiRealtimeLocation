const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');  
const expect = chai.expect;

chai.use(chaiHttp);

describe('Absen API', () => {
  it('should get all absen records', (done) => {
    chai
      .request(app)
      .get('/absen')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal(false);
        expect(res.body.message).to.equal('Successfully retrieved all absen records.');
        expect(res.body.absen).to.be.an('array');
        done();
      });
  });

//   it('should create a new absen record', (done) => {
//     chai
//       .request(app)
//       .post('/absen')
//       .field('6563bbfa6f3f4e69ba703e59', '6563bbfa6f3f4e69ba703e59') // Add other necessary fields
//       .field('status', 'Masuk') // Add other necessary fields
//       .attach('gambar', 'path/to/test/image.jpg') // Add the path to a test image
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body).to.be.an('object');
//         expect(res.body.error).to.equal(false);
//         expect(res.body.message).to.equal('Successfully created a new absen record.');
//         expect(res.body.absen).to.be.an('object');
//         done();
//       });
//   });

//   it('should get a specific absen record by ID', (done) => {
//     // Assume there is an existing absen record with a known ID
//     const absenId = '6563bbfa6f3f4e69ba703e59';

//     chai
//       .request(app)
//       .get(`/absen/${absenId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an('object');
//         expect(res.body.error).to.equal(false);
//         expect(res.body.message).to.equal('Successfully retrieved the absen record.');
//         expect(res.body.absen).to.be.an('object');
//         done();
//       });
//   });

  // Add more test cases for updating and deleting absen records as needed

  // ...

});

