const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const baseUrl = 'http://localhost:3000';

describe('POST /location', () => {

    it('should create a location and return 201', async () => {
        const locationData = {
            idClerk: 'c456789',
            backgroundColor: '#FFFFFF',
            foregroundColor: '#000000',
            value: 'geo:150,150',
            size: 10,
            name: 'Example QRCode Location'
        };

        const response = await chai
            .request(baseUrl)
            .post('/location')
            .send(locationData);

        expect(response).to.have.status(201);
        expect(response.text).to.equal('Ok');
    });
});


describe('GET /location/clerk123', () => {
    it('should get a QRCode by ID and return 200', async () => {
        const validId = 'valid-qrcode-id';

        const response = await chai
            .request(baseUrl)
            .get(`/getLocation/${validId}`);

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
    });
});

describe('DELETE /deleteLocation', () => {
    it('should delete a QRCode and return 200', async () => {
        const validQrcodeData = {
            idClerk: 'clerk123'
        };

        const response = await chai
            .request(baseUrl)
            .delete('/deleteQrcode')
            .send(validQrcodeData);

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
    });
});