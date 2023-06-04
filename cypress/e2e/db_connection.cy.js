/// <reference types="Cypress" />

describe('DB Connection', () => {
    it('Connection test', () => {
        cy.task('connectDB', 'SELECT id, application_user_role, email, "locked", "name", "password", photo FROM public.application_user;')
          .then((response)=>{
            cy.log(response)
            cy.log(`users: ${response[0].email}`)
        })
    })
})