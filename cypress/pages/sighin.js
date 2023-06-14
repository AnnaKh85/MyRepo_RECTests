class SighinPage {
    visit(){
        cy.visit(Cypress.env('testUI_url')+'/sign_in')
    }
    getWelcomeBackTxt(){
        return cy.get('.sign-page__header')
    }
    getEmail(){
        return cy.get('#email')
    }
    getPassword(){
        return cy.get('#password')
    }
    getRememberMeChbx(){
        return cy.get('#checkbox')
    }
    getSighInBtn(){
        return cy.get('.submit-btn')
    }
}
export default SighinPage