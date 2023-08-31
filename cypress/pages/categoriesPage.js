class CategoriesPage {

    clickCategoryLink(){
        return cy.get('.links > a:nth-of-type(1)')
            .click({force: true});
    }

    clickCreateNewCategoryBtn(){
        return cy.get(".cards > .card.card_create-new")
            .click({force: true});
    }

    typeCategoryName(categoryName){
        return cy.get("input#categoryName")
            .type(categoryName);
    }
    clickCreateNewCategoryOKBtn(){
        return cy.get(".btns__ok")
            .click({force: true});
    
    }

    getAllCategoryCards(){
        return cy.get(".cards .card .card__name")
    }
    getFirstCategoryCard(){
        cy.get("a:nth-of-type(1) .menu-btn > svg:nth-of-type(1)")
            .trigger("mouseover");
        cy.get("a:nth-of-type(1) .menu > div > button:nth-of-type(1)")
            .click({force: true});
    }
    typeRenameCategoryName(categoryName){
        return cy.get("input#categoryRename")
            .type(categoryName);
    }

    clickRenameCategoryOKBtn(){
        return cy.get(".btns__ok")
            .click({force: true});
    }

    getFirstCardToDelete(){
        cy.get("a:nth-of-type(1) .menu-btn > svg:nth-of-type(1)")
            .trigger("mouseover");
        cy.get("a:nth-of-type(1) .menu > div > button:nth-of-type(2)")
            .click({force: true});
    }

    clickDeleteCategoryOKBtn(){
        cy.get(".delete-account__ok_orange_btn")
            .click({force: true});
    
    }
}

export default CategoriesPage;