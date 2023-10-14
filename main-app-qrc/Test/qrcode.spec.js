const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const baseUrl = 'http://localhost:3000';

describe('POST /pushQrcode', () => {

    it('should create a location and return 201', async () => {
        const locationData = {
            idClerk: 'clerk123',
            backgroundColor: '#FFFFFF',
            foregroundColor: '#000000',
            ErrorLevel: 'H',
            value: 'example-value',
            size: 10,
            includeMargin: true,
            name: 'Example QRCode'
        };

        const response = await chai
            .request(baseUrl)
            .post('/pushQrcode')
            .send(locationData);

        expect(response).to.have.status(201);
        expect(response.text).to.equal('Ok');
    });
});


describe('GET /getQrcode/clerk123', () => {
    it('should get a QRCode by ID and return 200', async () => {
        const validId = 'valid-qrcode-id';

        const response = await chai
            .request(baseUrl)
            .get(`/getQrcode/${validId}`);

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
    });
});

describe('DELETE /deleteQrcode', () => {
    it('should delete a QRCode and return 200', async () => {
        const validQrcodeData = {
            idClerk: 'clerk13'
        };

        const response = await chai
            .request(baseUrl)
            .delete('/deleteQrcode')
            .send(validQrcodeData);

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
    });
});