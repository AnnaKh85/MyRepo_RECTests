/// <reference types="Cypress" />

import SighupPage from "../pages/sighup"
import UserProfilePage from "../pages/userProfilePage"

const profilePage = new UserProfilePage
const sighupPage = new SighupPage

describe(('User profile tests'), () => {
  beforeEach(() => {
    cy.fixture('localStorageData.json').then((json) => {
      const localStorageData = JSON.stringify(json);
      cy.window().then((win) => {
        win.localStorage.setItem('authRegister', localStorageData);
      });
    });
  });

  it(('Open profile page'), () => {
    profilePage.visit()
    profilePage.getProfileIconBtn().click()
    profilePage.getProfileTxt().should('have.text', 'Profile')
    profilePage.getMenuGeneralBtn().click()
    profilePage.getGeneralTxt().should('have.text', 'General')
    profilePage.getGeneralReplacePicBtn().click()
    profilePage.getAddProfilePicTxt().should('have.text', 'Add profile photo')
    profilePage.getAddProfilePicDragAndDropBtn().click()
    profilePage.getAddProfilePicCancelBtn().click()
    profilePage.getImageAllowedTxt().should('have.text', 'Allowed types: jpeg, jpg or png Maximum file size is 5 MB')
    profilePage.getNameLabelTxt().should('have.text', 'Max 30 symbols')

    profilePage.getNicknameInput().invoke('val').as('inputName')
    cy.fixture('sighup').then((data) => {
      cy.get('@inputName').then((inputName) => {
        expect(inputName).to.equal(data.name);
      });
    });

    profilePage.getEmailInput().invoke('val').as('inputEmail')
    cy.fixture('sighup').then((data) => {
      cy.get('@inputEmail').then((inputEmail) => {
        expect(inputEmail).to.equal(data.email);
      });
    });

    profilePage.getSaveChangesBtn().click()

    profilePage.getNameErrorMsg().should('not.be.visible')
    profilePage.getEmailErrorMsg().should('not.be.visible')
  })
})
