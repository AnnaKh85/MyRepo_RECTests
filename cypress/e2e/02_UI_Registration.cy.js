/// <reference types="Cypress" />

import SighinPage from "../pages/sighin";
import SighupPage from "../pages/sighup";
import StartPage from "../pages/startPage";
import UserProfilePage from "../pages/userProfilePage";
import { faker } from '@faker-js/faker'
import { qase } from 'cypress-qase-reporter/dist/mocha';
const sighupPage = new SighupPage();
const sighInPage = new SighinPage();
const startPage = new StartPage();
const profilePage = new UserProfilePage;

const baseURL = Cypress.env('testUI_url')
describe('Visit Recipetoria site', () => {
  beforeEach(() => {
    cy.fixture('sighup').then(function (data) {
      this.data = data
    })
  })

  it('Should visit the Recipetoria site', () => {
    sighupPage.visit();
  });

  qase(2,
    it('REC-2_Registration-Get started', function () {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const repeatPassword = password;

      cy.writeFile('cypress/fixtures/testData.json', {
        username: username,
        email: email,
        password: password,
      })
      cy.visit(baseURL);
      cy.get('.links > .orange-btn').click();
      cy.get('#nickname').clear().type(username);
      cy.get('#email').clear().type(email);
      cy.get('#password').clear().type(password);
      cy.get('#repeatPassword').clear().type(repeatPassword);
      cy.get('#checkbox').check();
      cy.get('.submit-btn').click();
      cy.get('.left-container__h2').click();
      cy.get('.left-container__h2 > :nth-child(2)').should('have.text', 'optimiser');
      cy.get('.profile-btn-popup__btn > .avatar > .avatar__image').click();
      cy.get('.log-out__btn').click();
      cy.get('.delete-account__text').click();
      cy.get('.delete-account__text').should('have.text', 'Are you sure you want to log out?');
      cy.get('.delete-account__ok').click();
      cy.get('.links > .btn').should('have.text', 'Log in');
    }));


  qase([3, 4],
    it('REC-3_Registration_For_registered_User', function () {
      cy.visit(baseURL);
      cy.fixture('testData.json').as('testData');

      cy.get('@testData').then((testData) => {
        const username = testData.username;
        const email = testData.email;
        const password = testData.password;

        cy.get('.links > .orange-btn').click();
        cy.log(username);
        cy.get('#nickname').type(username);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#repeatPassword').type(password);
        cy.get('#checkbox').check();
        cy.get('.submit-btn').click();
        cy.get('.sign-page__form > :nth-child(2)').click();
        cy.get(':nth-child(2) > .caption').should('have.text', 'User with this email already exists');
        cy.get('.switch-block__link').click();
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('.submit-btn').click();
        cy.get('.header__btn').should('have.text', 'New recipe');
      })
    }));


  qase([5, 6],
    it('REC-5_User_forget_password', function () {
      cy.visit(baseURL);

      cy.fixture('testData.json').as('testData');

      cy.get('@testData').then((testData) => {
        const username = testData.username;
        const email = testData.email;
        const password = testData.password;

        cy.get('.links.links_not-auth > .btn').click();
        cy.get("input#email").type(email);
        cy.get("input#password").type(password + "123");
        cy.get("[value='Sign in']").click();

        cy.get('.caption.caption_error').should('have.text', 'Invalid password');

        cy.get('input#password').clear().type(password);
        cy.log("Password : " + password);
        cy.get('.sign-page__form > .submit-btn').should('be.enabled');
        cy.get('.submit-btn').click();
        cy.get('.header__btn').should('be.visible');
      });
    })
  );

  qase(1,
    it('REC-1_Welcome_page', function () {
      cy.visit(baseURL);
      cy.fixture('testData.json').as('testData');
      cy.get('@testData').then((testData) => {
        const username = testData.username;
        const email = testData.email;
        const password = testData.password;

        cy.get('.links > .btn').click();
        cy.get('#email').clear().type(email);
        cy.get('#password').clear().type(password);
        cy.get('.submit-btn').click();
        cy.get('.header__btn').should('be.visible');
        cy.get('.start-page-bottom-part__header').should('be.visible');
        cy.get('.footer-links-n-rights > :nth-child(1)').should('be.visible');
        cy.get('.footer-links-n-rights > :nth-child(2)').should('be.visible');
        cy.get('.footer-links-n-rights > :nth-child(3)').should('be.visible');
        cy.get('.header__btn').should('have.text', 'New recipe');
      })
    }));
});


