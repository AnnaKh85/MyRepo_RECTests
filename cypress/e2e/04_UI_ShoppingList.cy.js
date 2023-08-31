/// <reference types="Cypress" />

import { qase } from "cypress-qase-reporter/dist/mocha";
import { faker } from "@faker-js/faker"
import ShoppingListPage from "../pages/shoppingListPage";

const shoppingListPage = new ShoppingListPage

describe('Shopping list tests', () => {
    beforeEach(() => {
      cy.fixture('sighup').then(function (data) {
        this.data = data
      })
    });
    
    qase(10, 
      it('Open sopping list', () => {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
    
        cy.visit(Cypress.env('testUI_url'));
    
        cy.createUser(username, email, password);

        cy.get('.links > [href="/shopping_list"]').click();
        cy.get('.shopping-list-block__h2').should('have.text', 'Shopping List');
        cy.get('.grid-table__new-item-btn > :nth-child(2)').click();
        cy.get("textarea[name='newIngredient.name']").click().type(faker.commerce.product());
        cy.get('body').click();
        cy.get("input[name='newIngredient.amount']").clear().type('10');
        cy.get('body').click();
        cy.get("#\:r5\:").then(()=>{
          cy.get("#\:r5\:").click();
          cy.get("ul[role='listbox']").contains("piece").click();
          cy.get('body').click();
        })

        // cy.get('.form-mask').click();
        // cy.get('.grid-table__new-item-btn').click();
        // cy.get('#\\:r7\\:').clear('0.');
        // cy.get('#\\:r7\\:').type('0.2');
        // cy.get('body').click();
        // cy.get('[data-value="kilogram"]').click();
        // cy.get('.form-mask').click();
        // cy.get('.grid-table__new-item-btn').click();
        // cy.get('#\\:rd\\:').clear('0.');
        // cy.get('#\\:rd\\:').type('0.5');
        // cy.get('body').click();
        // cy.get('[data-value="kilogram"]').click();
        // cy.get('.form-mask').click();
        // cy.get(':nth-child(4) > .grid-table__number').should('have.text', '3');
        cy.get('.header__wrapper > a > .logo__wrapper > .logo').click();
        cy.get('.left-container__h2').should('have.text', 'Recipe organiser and grocery optimiser');
        cy.get(".links [href='\/shopping_list']").click();
        cy.get('#\\:ro\\:').should('be.visible');

      })
    )

})