class UserProfilePage {

    visit(){
        cy.visit(Cypress.env('testUI_url'))
    }

    getProfileIconBtn(){
        return cy.get('.profile-btn-popup__btn .avatar__image_default')
    }

    getAvatarLogoutBtn(){
        return cy.get('.log-out__btn')
    }

    getAvatarLogoutOKBtn(){
        return cy.get('.delete-account__ok')
    }

    getEnterToProfileBtn(){
        return cy.get('.data-btn-cross__btn')
    }

    getProfileTxt(){
        return cy.get('.profile-data__h3')
    }
    getMenuGeneralBtn(){
        return cy.get('.profile-menu__btns > button:nth-of-type(1)')
    }
    getGeneralTxt(){
        return cy.get('.general__header')
    }
    getGeneralReplacePicBtn(){
        return cy.get('.general__btn')
    }
    getAddProfilePicTxt(){
        return cy.get('.add-profile-photo__header')
    }
    getAddProfilePicCancelBtn(){
        return cy.get('.add-profile-photo__cancel')
    }
    getAddProfilePicUploadPicBtn(){
        return cy.get('.add-profile-photo__upload')
    }
    getAddProfilePicDragAndDropBtn(){
        return cy.get('.drop-photo__img')
    }
    getImageAllowedTxt(){
        return cy.get('.general__caption')
    }
    getNicknameInput(){
        return cy.get('#nickname')
    }
    getEmailInput(){
        return cy.get('#email')
    }
    getNameLabelTxt(){
        return cy.get('.caption')
    }
    getSaveChangesBtn(){
        return cy.get('.profile-general__submit-btn')
    }
    getNameErrorMsg(){
        return cy.get(':nth-child(1) > .caption')
    }
    getEmailErrorMsg(){
        return cy.get(':nth-child(2) > .caption')
    }
    getChangePasswordMenuBtn(){
        return cy.get('.false.profile-menu__btn')
    }
    getOldPasswordInput(){
        return cy.get('#oldPassword')
    }
    getNewPasswordInput(){
        return cy.get('#password')
    }
    getNewPasswordRepeatInput(){
        return cy.get('#repeatPassword')
    }
    getSaveNewPasswordBtn(){
        return cy.get('.profile-change-password__submit-btn')
    }
    getLogoutBtn(){
        return cy.get('.profile-menu__btns > button:nth-of-type(3)')
    }

    getLogoutMsg(){
        return cy.get('.delete-account__text')
    }
    
    getLogoutCancelBtn(){
        return cy.get('.delete-account__cancel')
    }

    getLogoutOKBtn(){
        return cy.get('.delete-account__ok')
    }

    getLoginBtn(){
        return cy.get('.btn')
    }
    getWelcomeBackTxt(){
        return cy.get('.main')
    }
    getEmailInput(){
        return cy.get('#email')
    }
    getPasswordInput(){
        return cy.get('#password')
    }
    getRememberMeChbx(){
        return cy.get('#checkbox')
    }
    getSighInBtn(){
        return cy.get('.submit-btn')
    }
    getDeleteAccBtn(){
        return cy.get('.profile-menu > div > .profile-menu__btn')
    }
    getDeleteAccText(){
        return cy.get('.delete-account__text')
    }
    getDeleteAccCancelBtn(){
        return cy.get('.delete-account__cancel')
    }
    getDeleteAccOkBtn(){
        return cy.get('.delete-account__ok')
    }

}

export default UserProfilePage