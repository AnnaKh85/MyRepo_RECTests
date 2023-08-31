/// <reference types="Cypress" />

import { qase } from "cypress-qase-reporter/dist/mocha";
import { faker } from "@faker-js/faker"
import CategoriesPage from "../pages/categoriesPage";

const categoriesPage = new CategoriesPage();

describe('Tests Category page', () => {
    beforeEach(() => {
        cy.fixture('sighup').then(function (data) {
          this.data = data
        })
      });
    qase(8, it('Create new category', function () {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        const productName = "---Meal";

        cy.visit(Cypress.env('testUI_url'));
        cy.createUser(username, email, password);

        categoriesPage.clickCategoryLink();
        categoriesPage.clickCreateNewCategoryBtn();
        categoriesPage.typeCategoryName(productName);
        categoriesPage.clickCreateNewCategoryOKBtn();

        categoriesPage.clickCategoryLink();

        let categoryCreated = false;

        categoriesPage.getAllCategoryCards().each((card) => {
            cy.wait(1000);
            const categoryName = card.text();
            cy.log(categoryName)
            cy.wait(1000)

            if (categoryName === productName) {
                categoryCreated = true;
                cy.log('Category created')
            }
        })
        //     .then(() => {
        //         expect(categoryCreated).to.be.true;
        // })
    }))

    qase(9, it('Edit category: rename category, delete category', function () {

            cy.visit(Cypress.env('testUI_url'));

        cy.fixture('testData').then(function (data) {
            cy.get('.links > .btn').click();
            cy.get('#email').clear().type(data.email);
            cy.get('#password').clear().type(data.password);
            cy.get('.submit-btn').click();
            cy.get('.links > [href="/all_categories"]').click();

            cy.xpath("//h4[text()='---Meal']")
            cy.get('a:nth-of-type(1)  .card__name').should('have.text', '---Meal');

            categoriesPage.getFirstCategoryCard();
            categoriesPage.typeRenameCategoryName("-Meal");
            categoriesPage.clickRenameCategoryOKBtn();
            cy.xpath("//h4[text()='-Meal']").should('have.text', '-Meal');

            categoriesPage.getFirstCardToDelete();
            categoriesPage.clickDeleteCategoryOKBtn();

        })
    }))

})