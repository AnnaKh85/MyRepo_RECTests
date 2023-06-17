class ShoppingListPage {

    visit(){
        cy.visit(Cypress.env('testUI_url')+'/shopping_list')
    }
    getShoppingListTitle(){
        return cy.get('.shopping-list-block__h2')
    }
    getAddNewItemBtn(){
        return cy.get('.shopping-list-table__add-btn-text')
    }
    getNewString(){
        return cy.get('..empty-string-on-hover_true__button')
    }
}

export default ShoppingListPage;