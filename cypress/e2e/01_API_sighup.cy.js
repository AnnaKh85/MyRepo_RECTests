/// <reference types="Cypress" />


describe('API.Auth.Register a new user', () =>{
    let token; 
    const baseURL = Cypress.env('testAPI_url')

    beforeEach(()=>{
        cy.fixture('sighup.json').then((fixtureData) =>{
            cy.task('connectDB', 'SELECT id, application_user_role, email, "locked", "name", "password", photo FROM public.application_user;')
              .then((dbResponse) => {
                const existingUser = dbResponse.find((user) => user.email === fixtureData.email && user.name === fixtureData.name);
                if (existingUser) {
                    cy.log('User exist')
                    Cypress.runner.stop();
                }            
        })
    })

    it('API. Send a POST request to register a new user', ()=> {
        cy.fixture('sighup.json').then((fixtureData)=>{
                cy.request('POST', baseURL + '/api/v1/auth/register', fixtureData)
                  .then((response)=>{
                    expect(response.status).to.eq(201);
                    expect(response.body.data.authenticationResponse.token).to.exist;
                    token = response.body.data.authenticationResponse.token;
                    cy.log(token)
                  })
            }) 
        })
       
    })

    it('API. Get User personal information', ()=>{
        cy.request({
            method:'GET',
            url: baseURL + '/api/v1/client/settings',
            headers:{
                'Authorization': `Bearer ${token}`          
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
        })
    })

    it('API. Update user name', ()=>{
        const requestBody = {
            "name": "New name"
        }

        cy.request({
            method: 'PATCH',
            url: baseURL + '/api/v1/client/settings/personal-info',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                requestBody
              }
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })

    it('API. Delete user', ()=>{
        cy.request({
            method: 'DELETE',
            url: baseURL + '/api/v1/client/settings/account-delete',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            expect(response.status).to.eq(204)
        })
    })

})