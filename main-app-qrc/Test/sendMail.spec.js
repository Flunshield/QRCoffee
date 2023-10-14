const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const baseUrl = 'http://localhost:3000';

describe('POST /sendContact', () => {
    it('should send a contact email and return 200', async () => {
        const contactData = {
            username: 'testuser',
            email: 'test@example.com',
            message: 'This is a test message'
        };

        const response = await chai
            .request(baseUrl)
            .post('/sendContact')
            .send(contactData);

        expect(response).to.have.status(200);
        expect(response.text).to.equal('E-mail envoyé avec succès.');
    });
});
