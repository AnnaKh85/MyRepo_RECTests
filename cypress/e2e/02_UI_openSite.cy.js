/// <reference types="Cypress" />

import SighinPage from "../pages/sighin";
import SighupPage from "../pages/sighup";
import StartPage from "../pages/startPage";
const sighupPage = new SighupPage()
const sighInPage = new SighinPage()
const startPage = new StartPage()

describe('Visit Recipetoria site', () => {
  beforeEach(() => {
    cy.fixture('sighup').then(function (data) {
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

      sighupPage.getUserExistMsg().should('be.visible').then(($err) => {
        if ($err.length > 0) {
          cy.log('User already exists.')
          sighupPage.getSighInLink().click()
        }
      })
    })
  })

  it('Sigh in an exist user', () => {
    sighInPage.visit()
    sighInPage.getWelcomeBackTxt().should('have.text', 'Welcome back!')

    cy.fixture('sighup').then((data) => {
      sighInPage.getEmail().type(data.email)
      sighInPage.getPassword().type(data.password)
      sighInPage.getRememberMeChbx().check()
      sighInPage.getSighInBtn().click()
    })

    startPage.getStartPageMsg().should('have.text', 'Start page')

  })
});

