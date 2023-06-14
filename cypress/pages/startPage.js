class StartPage{
    
    visit(){
        cy.visit(Cypress.env('testUI_url'))
    }

    getStartPageMsg(){
        return cy.get('h3')
    }

}

export default StartPage