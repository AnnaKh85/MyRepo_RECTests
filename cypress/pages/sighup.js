class SighupPage{

    visit(){
        //cy.visit(Cypress.config().baseUrl +  '/sign_up');
        cy.visit(Cypress.env('testUI_url'))
    }

    getSighUpBtn(){
        return cy.get('.orange-btn')
    }

    getNickname(){
        return cy.get('input#nickname')
    }
    getNicknameInnerText(){
        return cy.get('div:nth-of-type(1) > .caption')
    }
    getEmail(){
        return cy.get('input#email')
    }
    getPassword(){
        return cy.get('input#password')
    }
    getPasswordInnerText(){
        return cy.get('div:nth-of-type(3) > .caption')
    }
    getRepeatPass(){
        return cy.get('input#repeatPassword')
    }
    getAgreeChbox(){
        return cy.get('input#checkbox')
    }
    getAgreeChBoxText(){
        return cy.get('.form-control-input__label form-control-input__label_checkbox')
    }
    getGetStartedBtn(){
        return cy.get('.sign-page__form > .submit-btn')
    }
}

export default SighupPage