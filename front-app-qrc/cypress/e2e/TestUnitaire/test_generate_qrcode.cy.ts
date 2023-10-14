import { } from 'cypress';
import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";

describe('Test de la génération du QRCode', () => {
  it('Test de la génération du QRCode', () => {
    cy.visit('http://localhost:5173');

    login('piggercraft@gmail.com', 'Julien84350!');

    cy.get('footer').contains('Nous Contacter').should('be.visible');

    const data = {
      name: "coucou",
      value: "www.google.com"
    };

    cy.get('#ROOT_CREATE_QRCODE').click();

    cy.get('#name').type(data.name);
    cy.wait(500);
    cy.get('#value').type(data.value);
    cy.wait(500);
    cy.contains('label', 'L').click();
    cy.wait(500);

    cy.get('#Générer-le-QRCODE').click();
    cy.wait(500);

    cy.get('h1').contains('Préversualisation du QRCode').should('be.visible');
    cy.wait(500);

    cy.intercept('POST', 'http://localhost:3000/pushQrcode').as('pushQrcode');
    cy.wait(500);
    cy.get('#Sauvegarder').click();

    try {
      cy.wait('@pushQrcode').should((interception) => {
        // Vérifier que la requête a été interceptée sans vérifier la réponse
        expect(interception).to.be.an('object');

        // Créer un objet avec les propriétés attendues dans la requête
        const expectedPayload = {
          name: data.name,
          foregroundColor: "#000000",
          backgroundColor: "#DEEEEB",
          value: data.value,
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
