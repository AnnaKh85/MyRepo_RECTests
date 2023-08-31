/// <reference types="Cypress" />

import { faker } from "@faker-js/faker"
import SighupPage from "../pages/sighup"
import UserProfilePage from "../pages/userProfilePage"
import { qase } from "cypress-qase-reporter/dist/mocha"

const profilePage = new UserProfilePage;

describe(('User profile tests'), () => {
  beforeEach(() => {
      cy.fixture('sighup').then(function (data) {
        this.data = data
      })
  });

  it.skip(('Open profile page'), () => {
    profilePage.visit()
    profilePage.getProfileIconBtn().click()
    profilePage.getEnterToProfileBtn().click()
    profilePage.getProfileTxt().should('have.text', 'Profile')
    //profilePage.getMenuGeneralBtn().click()
    profilePage.getGeneralTxt().should('have.text', 'General')

    //file uploading
    //https://www.software-testing.ru/library/testing/testing-tools/3984-cypress-basics-uploading-file

    //profilePage.getGeneralReplacePicBtn().click()
    //profilePage.getAddProfilePicTxt().should('have.text', 'Add profile photo')
    //profilePage.getAddProfilePicDragAndDropBtn().click()
    //profilePage.getAddProfilePicCancelBtn().click()
    //profilePage.getImageAllowedTxt().should('have.text', 'Allowed types: jpeg, jpg or png Maximum file size is 5 MB')
    //profilePage.getNameLabelTxt().should('have.text', 'Max 30 symbols')

    profilePage.getNicknameInput().invoke('val').as('inputName')
    cy.fixture('sighup').then((data) => {
      cy.get('@inputName').then((inputName) => {
        expect(inputName).to.equal(data.name);
      });
    });

    // profilePage.getEmailInput().invoke('val').as('inputEmail')
    // cy.fixture('sighup').then((data) => {
    //   cy.get('@inputEmail').then((inputEmail) => {
    //     expect(inputEmail).to.equal(data.email);
    //   });
    // });

    profilePage.getSaveChangesBtn().click()

    //  turn on after correction 
    // profilePage.getNameErrorMsg().should('not.be.visible')
    // profilePage.getEmailErrorMsg().should('not.be.visible')

    profilePage.getChangePasswordMenuBtn().click()

    cy.fixture('sighup').then((data) => {
      profilePage.getOldPasswordInput().type(data.password)
      //profilePage.getOldPasswordInput().type(faker.password) - faker example
      profilePage.getNewPasswordInput().type(data.newPassword)
      profilePage.getNewPasswordRepeatInput().type(data.newPassword)
      profilePage.getSaveNewPasswordBtn().click()

      profilePage.getLogoutBtn().click()

      profilePage.getLogoutMsg().should('have.text', 'Are you sure you want to log out?')
      profilePage.getLogoutCancelBtn().click()
      profilePage.getLogoutBtn().click()
      profilePage.getLogoutOKBtn().click()

      profilePage.getLoginBtn().click()

      //profilePage.getWelcomeBackTxt().should('have.text', 'Welcome back!')
      //cy.url().should('include', '/add_recipe')

      cy.fixture('sighup').then((data) => {
        profilePage.getEmailInput().type(data.email)
        profilePage.getPasswordInput().type(data.newPassword) //https://cgrey.atlassian.net/browse/REC-137
      })
      profilePage.getRememberMeChbx().check()
      profilePage.getSighInBtn().click()

      profilePage.getProfileIconBtn().click()
      profilePage.getEnterToProfileBtn().click()

      profilePage.getDeleteAccBtn().click()
      profilePage.getDeleteAccText().should('have.text', 'Are you sure you want to delete your account?')
      profilePage.getDeleteAccCancelBtn().click()
      profilePage.getDeleteAccBtn().click()
      profilePage.getDeleteAccOkBtn().click()


    })
  })

  qase(7, it(('REC-7_User_Profile'), () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const repeatPassword = password;

    cy.visit(Cypress.env('testUI_url'));

    cy.createUser(username, email, password);

    cy.fixture('testData.json').as('testData');
    cy.get('@testData').then((testData) => {
      const username = testData.username;
      const email = testData.email;
      const password = testData.password;

      cy.get('.profile-btn-popup__btn > .avatar > .avatar__image').click();
      cy.get('.data-btn-cross__btn').click();
      cy.get('#nickname').clear().type(username + "123");
      cy.get("[value='Save changes']").click();

      cy.get('.false.profile-menu__btn').click();

      cy.get('#oldPassword').clear().type(password);
      cy.get('#password').clear().type('123456');
      cy.get('#repeatPassword').clear().type('123456');
      cy.get('.profile-change-password__submit-btn').click();
      cy.get('.profile-menu__btns > :nth-child(3)').click();
      cy.get('.modal-box').click();
      cy.get('.delete-account__text').should('have.text', 'Are you sure you want to log out?');
      cy.get('.delete-account__ok').click();
      cy.get('.links > .btn').click();
      cy.get('#email').clear().type(email);
      cy.get('#password').clear().type('123456');
      cy.get('.submit-btn').click();


      cy.get('.profile-btn-popup__btn > .avatar > .avatar__image').click();
      cy.get('.data-btn-cross__btn').click();
      cy.get('.profile-menu__delete-btn-wrapper > .profile-menu__btn').click();
      cy.get('.delete-account__text').should('have.text', 'Are you sure you want to delete your account?');
      cy.get('.delete-account__ok').click();
      cy.get('.links > .btn').click();
      cy.get('#email').clear().type(email);
      cy.get('#password').clear().type('123456');
      cy.get('.submit-btn').click();
      cy.get('.caption').should('have.text', 'A user with such an email address does not exist');

    })


  }))

})
