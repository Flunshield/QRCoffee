import { } from 'cypress';
import {login} from "../FonctionCommune/login.cy";
import {logout} from "../FonctionCommune/logout.cy";


describe('Test du footer', () => {

  it('Affiche la page d\'accueil avec les boutons dans le footer', () => {

    cy.visit('http://localhost:5173');

    login('piggercraft@gmail.com', 'Julien84350!');

    // REGION check boutton
    cy.get('footer').contains('© 2023 QR-Coffee - Le QrCode qui vous fait également le café !').should('be.visible');
    cy.wait(500);

    cy.get('footer').contains('Politique de confidentialité').should('be.visible');
    cy.wait(500);

    cy.get('footer').contains('Mentions légales').should('be.visible');
    cy.wait(500);

    cy.get('footer').contains('Nous Contacter').should('be.visible');
    cy.wait(500);

    cy.get('footer').contains('Créé votre QR-code').should('be.visible');
    cy.wait(500);

    cy.get('footer').contains('Nous Contacter').should('be.visible');
    cy.wait(500);

    // END REGION check boutton

    // REGION clic boutton
    cy.get('#ROOT_CREATE_QRCODE').click();
    cy.wait(500);

    cy.get('label').contains('Nom du Qr-Code').should('be.visible');
    cy.wait(500);

    cy.get('#HOME').click();
    cy.wait(500);

    cy.get('p').contains('Générez, sauvegardez et réutilisez instantanément vos QR codes en quelques clics !').should('be.visible');
    cy.wait(500);

    cy.get('#ROOT_QRCODE_AREA').click();
    cy.wait(500);

    cy.get('#HOME').click();
    cy.wait(500);

    cy.get('p').contains('Générez, sauvegardez et réutilisez instantanément vos QR codes en quelques clics !').should('be.visible');
    cy.wait(500);

    cy.get('#ROOT_MY_CONTACT').click();
    cy.wait(500);

    cy.get('#HOME').click();
    cy.wait(500);

    cy.get('p').contains('Générez, sauvegardez et réutilisez instantanément vos QR codes en quelques clics !').should('be.visible');
    cy.wait(500);

    cy.get('#ROOT_PRIVACY_POLICY').click();
    cy.wait(500);

    cy.get('#HOME').click();
    cy.wait(500);

    cy.get('p').contains('Générez, sauvegardez et réutilisez instantanément vos QR codes en quelques clics !').should('be.visible');
    cy.wait(500);

    cy.get('#ROOT_LEGAL_NOTICE').click();
    cy.wait(500);

    cy.get('#HOME').click();
    cy.wait(500);
    //END REGION

    cy.get('p').contains('Générez, sauvegardez et réutilisez instantanément vos QR codes en quelques clics !').should('be.visible');
    cy.wait(500);

    logout();
  });
});

export {};
