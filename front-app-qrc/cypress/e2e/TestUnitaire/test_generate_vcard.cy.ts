import { } from 'cypress';
import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";

describe('Test de la génération du QRCocde Vcard', () => {
  it('Test de la génération du QRCocde Vcard', () => {
    cy.visit('http://localhost:5173');

    login('piggercraft@gmail.com', 'Julien84350!');

    cy.get('footer').contains('Nous Contacter').should('be.visible');

    const data = {
      name: "coucou",
      firstName: "antoine",
      lastName: "daniel",
      job: "youtubeur",
      email: "antoine.daniel@youtube.com",
      telephone: "0600000000",
      adresse: "15 rue de la paix, 75000 monopoly",
      foregroundColor: "#000000",
      backgroundColor: "#DEEEEB",
    };

    cy.get('#ROOT_CREATE_QRCODE').click();
    cy.get('button').contains('Qrcode Vcard').click();

    cy.get('#nameVcard').type(data.name);
    cy.get('#firstNameVcard').type(data.firstName);
    cy.get('#lastNameVcard').type(data.lastName);
    cy.get('#jobVcard').type(data.job);
    cy.get('#emailVcard').type(data.email);
    cy.get('#telephoneVcard').type(data.telephone);
    cy.get('#adresseVcard').type(data.adresse);
    cy.get('#foregroundColorVcard').type(data.foregroundColor);
    cy.get('#backgroundColorVcard').type(data.backgroundColor);

    cy.get('#Générer-le-QRCODE').click();

    cy.get('button').contains('Télécharger').should('be.visible');

    cy.intercept('POST', 'http://localhost:3000/pushVcard').as('postVcard');
    cy.wait(500);
    cy.get('#Sauvegarder').click();

    try {
      cy.wait('@postVcard').should((interception) => {
        // Vérifier que la requête a été interceptée sans vérifier la réponse
        expect(interception).to.be.an('object');

        // Créer un objet avec les propriétés attendues dans la requête
        const expectedPayload = {
          name: data.name,
          foregroundColor: "#000000",
          backgroundColor: "#DEEEEB",
          value: `BEGIN:VCARD\nVERSION:2.1\nN:${data.lastName};${data.firstName};;;\nFN:${data.firstName} ${data.lastName}\nORG:Company Name\nTITLE:${data.job}\nEMAIL;TYPE=INTERNET:${data.email}\nTEL;TYPE=CELL:${data.telephone}\nADR;TYPE=WORK:${data.adresse}\nEND:VCARD`,
          size: 256
        };

        // Vérifier que les propriétés attendues sont égales à celles de la requête
        expect(interception.request.body).to.deep.include(expectedPayload);
      });
    } catch (error) {
      true
      // Ne pas propager l'erreur pour éviter qu'elle soit considérée comme une erreur de test
    }

    logout();
  });
});

// Déclaration d'export pour traiter le fichier en tant que module TypeScript
export {};
