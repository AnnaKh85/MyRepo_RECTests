/// <reference types="Cypress" />

import SighupPage from "../pages/sighup";
const sighupPage = new SighupPage()

describe('Visit Recipetoria site', () => {
  beforeEach(() => {
    cy.fixture('sighup').then(function(data) {
      this.data = data
    })
  })

  it('Should visit the Recipetoria site', () => {
    sighupPage.visit();
  });


  it('Fill the registration form from fixture file', () => {
    sighupPage.visit()
    sighupPage.getSighUpBtn().click()

    cy.fixture('sighup').then((data) => {
      sighupPage.getNickname().type(data.name)
      sighupPage.getNicknameInnerText().should('have.text', 'Max 30 symbols')
      sighupPage.getEmail().type(data.email)
      sighupPage.getPassword().type(data.password)
      sighupPage.getPasswordInnerText().should('have.text', 'Minimum 6 characters')
      sighupPage.getRepeatPass().type(data.password)
      sighupPage.getAgreeChbox().check().should('be.checked')
      sighupPage.getGetStartedBtn().click()
    })
  })
});

