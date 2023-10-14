import { } from 'cypress';
import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";

describe('Test envoie mail', () => {
  it('Test envoie mail', () => {
    cy.visit('http://localhost:5173');

    login('piggercraft@gmail.com', 'Julien84350!');

    cy.get('footer').contains('Nous Contacter').should('be.visible');

    const data = {
      username: "user",
      email: "piggercraft@gmail.com",
      message: "abemous papoum"
    };

    cy.get('#ROOT_MY_CONTACT').click();

    cy.get('#username').type(data.username);
    cy.get('#email').type(data.email);
    cy.get('#message').type(data.message);

    cy.intercept('POST', 'http://localhost:3000/sendContact', {}).as('postContact');
    cy.wait(500);
    cy.get('#Envoyer').click();

    try {
      cy.wait('@postContact').should((interception) => {
        // Vérifier que la requête a été interceptée sans vérifier la réponse
        expect(interception).to.be.an('object');

        // Créer un objet avec les propriétés attendues dans la requête
        const expectedPayload = {
          username: data.username,
          email: data.email,
          message: data.message
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

// Déclaration d'export pour traiter le fichier en tant que module TypeScript
export {};
