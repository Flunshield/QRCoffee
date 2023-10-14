import { } from 'cypress';
export const logout = () => {
    cy.get('#id-bouton-profile').trigger('mouseover');

    cy.get('#button-compte').should('be.visible');

    cy.contains('Déconnexion').click();

    cy.title().should('include', 'QRCoffee - Le Générateur qui vous fais même le café !');

};