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