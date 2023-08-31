// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

beforeEach(() => {
    cy.fixture('sighup').then(function(data) {
      this.data = data
    })
  })

Cypress.Commands.add('loginAPI', () => {
    const baseurl = Cypress.config().baseUrl

    cy.fixture('sighup').then((data) => {
        cy.request('POST', baseurl, 
                    {
                        "name": data.name, 
                        "email": data.email, 
                        "password":data.password
                    })
           .then(function(response){
                expect(response.status).to.eq(200)
           })
})
})

Cypress.Commands.add('getUserData', () => {
  cy.window().then((win) => {
    const userData = JSON.parse(win.localStorage.getItem('authRegister'));
    cy.wrap(userData).as('authRegister');
  });
});

Cypress.Commands.add('createUser', (username, email, password) => {
  cy.writeFile('cypress/fixtures/testData.json', {
    username: username,
    email: email,
    password: password,
  })
  cy.visit(Cypress.env('testUI_url'));
  cy.get('.links > .orange-btn').click();
  cy.get('#nickname').clear().type(username);
  cy.get('#email').clear().type(email);
  cy.get('#password').clear().type(password);
  cy.get('#repeatPassword').clear().type(password);
  cy.get('#checkbox').check();
  cy.get('.submit-btn').click();
  cy.get('.left-container__h2').click();
  cy.get('.left-container__h2 > :nth-child(2)').should('have.text', 'optimiser');
})