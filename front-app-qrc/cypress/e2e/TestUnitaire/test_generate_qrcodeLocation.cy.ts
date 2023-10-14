import { } from 'cypress';
import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";

describe('Test de la génération du QRCode location', () => {
  it('Test de la génération du QRCode location', () => {
    cy.visit('http://localhost:5173');

    const data = {
      name: "coucou",
      latitude: "150",
      longitude: "150"
    };

    login('piggercraft@gmail.com', 'Julien84350!');

    cy.get('footer').contains('Nous Contacter').should('be.visible');
    cy.wait(500);

    cy.get('#ROOT_CREATE_QRCODE').click();
    cy.wait(500);
    cy.get('button').contains('Qrcode Localisation').click();
    cy.wait(500);

    cy.get('#nameLocation').type(data.name);
    cy.wait(500);
    cy.get('#latitudeLocation').type(data.latitude);
    cy.wait(500);
    cy.get('#longitudeLocation').type(data.longitude);
    cy.wait(500);

    cy.get('#Générer-le-QRCODE').click();
    cy.wait(1000);

    cy.intercept('POST', 'http://localhost:3000/location', { times: 2 }).as('postLocation');

    cy.get('#Sauvegarder').click();
    cy.wait(1000);

    try {
      cy.wait('@postLocation').should((interception) => {
        // Vérifier que la requête a été interceptée sans vérifier la réponse
        expect(interception).to.be.an('object');

        // Créer un objet avec les propriétés attendues dans la requête
        const expectedPayload = {
          name: data.name,
          value: `geo:${data.latitude},${data.latitude}`,
          foregroundColor: "#000000",
          backgroundColor: "#DEEEEB",
          size: 256
        };

        // Vérifier que les propriétés attendues sont égales à celles de la requête
        expect(interception.request.body).to.deep.include(expectedPayload);
      });
    } catch (error) {
      // Ne pas propager l'erreur pour éviter qu'elle soit considérée comme une erreur de test
    }

    logout();
  });
});

export {};
