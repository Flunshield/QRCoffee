import { } from 'cypress';
import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";

describe('Test du header', () => {
  it('Affiche la page d\'accueil avec les boutons dans le header', () => {
    cy.visit('http://localhost:5173');

    login('piggercraft@gmail.com', 'Julien84350!');

    cy.title().should('include', 'QRCoffee - Le Générateur qui vous fais même le café !');
    cy.wait(500);

    cy.get('header').contains('Accueil').should('be.visible');
    cy.wait(500);

    cy.get('header').contains('Créer un QRCODE').should('be.visible');
    cy.wait(500);

    cy.get('header').contains('Espace QrCode').should('be.visible');
    cy.wait(500);

    logout();
});
});

export {};
