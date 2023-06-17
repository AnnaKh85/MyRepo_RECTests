/// <reference types="Cypress" />

import ShoppingListPage from "../pages/shoppingListPage";

const shoppingListPage = new ShoppingListPage

describe('Shopping list tests', () => {
    beforeEach(() => {
        cy.fixture('localStorageData.json').then((json) => {
          const localStorageData = JSON.stringify(json);
          cy.window().then((win) => {
            win.localStorage.setItem('authRegister', localStorageData);
          });
        });
      });
    
    it('Open sopping list', () => {
        shoppingListPage.visit()
        shoppingListPage.getShoppingListTitle().should('have.text', 'Shopping list')
        shoppingListPage.getAddNewItemBtn().click().trigger('mouseover', {force:true}).click()
        //shoppingListPage.getNewString().trigger('mouseup')
    })
})