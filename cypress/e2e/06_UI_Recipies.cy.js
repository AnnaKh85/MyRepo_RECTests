/// <reference types="Cypress" />
import { qase } from "cypress-qase-reporter/dist/mocha";
import { faker } from "@faker-js/faker"

describe("Resipe tests", () => {
    beforeEach(() => {
        cy.fixture('sighup').then(function (data) {
            this.data = data
        })
    });

    qase(251,
        it("Create new recipe", () => {
            const username = faker.internet.userName();
            const email = faker.internet.email();
            const password = faker.internet.password();
            const recipeName = faker.commerce.product();
            const instructions = faker.lorem.paragraph();

            cy.visit(Cypress.env('testUI_url'));
            cy.createUser(username, email, password);

            cy.get('.header__btn').click(); // click New recipe
            cy.get('#recipeNameWithoutTag').clear().type(recipeName); // Enter recipe name
            cy.get('.btns__ok').click();

            cy.get('.instruction__h3').should('have.text', 'Cooking instructions');

            cy.get('.instruction__header > .btn-edit > .btn-edit__btn > span').click(); // click Edit btn
            cy.get("textarea[name='text']").type(instructions); // Type cooking instructions
            cy.xpath("//button[text()='Save changes']").click(); // click Save changes btn

            cy.get("textarea[name='ingredient.0.name']").click().clear().type(faker.commerce.product());
            cy.get("textarea[name='ingredient.0.name']").tab().clear().type("10");
            cy.xpath("//span[text()='Add new item']").click();
            cy.get("[name='newIngredient.name']").click().clear().type(faker.commerce.product());
            cy.get("[name='newIngredient.name']").tab().clear().type("20");

            cy.get('body').click();

            cy.get('.categories-n-header__categories > :nth-child(1) > span').click();
            cy.get('#outlined-error-helper-text').clear().type(faker.internet.url());

            cy.get('.links > [href="/all_categories"]').click();
            cy.xpath("//h4[text()='Chicken']").click();
            cy.xpath("(//h4[@class='recipe-card__name'])").each(($el, index, $list) => {
                if ($el.text() === recipeName) {
                    cy.get($el).click();
                }

            })
            //cy.get('.recipe-page-header__text').should('have.text', recipeName);

        })
    )

    it("Edit recipe", () => {

    })
})