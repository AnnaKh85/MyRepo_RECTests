class UserProfilePage {

    visit(){
        cy.visit(Cypress.env('testUI_url'))
    }

    getProfileIconBtn(){
        return cy.get('.default-avatar')
    }

    getProfileTxt(){
        return cy.get('.profile-data__h3')
    }
    getMenuGeneralBtn(){
        return cy.get('.profile-menu__btn_active')
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

}

export default UserProfilePage