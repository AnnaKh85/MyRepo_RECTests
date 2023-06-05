/// <reference types="Cypress" />

describe('API. E2E testing', () =>{
    let token; 
    const baseURL = Cypress.env('testAPI_url')
    const fixtureFile = 'dataForAPITests.json'
    let userExist = false;

    beforeEach(() => {
        cy.fixture(fixtureFile).then((fixtureData) => {
          cy.task('connectDB', 'SELECT id, email, "name", "password" FROM public.application_user;')
            .then((dbResponse) => {
              const existingUser = dbResponse.find((user) => user.email === fixtureData.email && user.name === fixtureData.name);
              if (existingUser) {
                cy.log('User exists');
                userExist = true;
                //Cypress.runner.stop();
              }
            });
        });
      });

  // api/v1/auth/register
  it('API. Register a new user', () => {
    if (userExist) {
        cy.log('User does not exist. Skipping test.')
        cy.skip();
    } else {
        cy.fixture(fixtureFile).then((fixtureData) => {
            cy.request('POST', baseURL + '/api/v1/auth/register', fixtureData)
              .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.data.authenticationResponse.token).to.exist;
                token = response.body.data.authenticationResponse.token;
                cy.log(token);
            });
        });
    }

  });

  // api/v1/auth/authenticate
  it('API. Authenticate an existing user', () => {
    if (userExist) {
        cy.fixture(fixtureFile).then((fixtureData) => {
            cy.request('POST', baseURL + '/api/v1/auth/authenticate', fixtureData)
              .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.authenticationResponse.token).to.exist;
                token = response.body.data.authenticationResponse.token;
                cy.log('Got a new token ' + token);
            });
        });
    } else {
        cy.log('User does not exist. Skipping test.')
        cy.skip();
    }
  });

  // api/v1/client/settings
  it('API. Get User personal information', () => {
    cy.request({
      method: 'GET',
      url: baseURL + '/api/v1/client/settings',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // api/v1/client/settings/personal-info
  it('API. Update user name', () => {
    const requestBody = {
      "name": "New name"
    };

    cy.request({
      method: 'PATCH',
      url: baseURL + '/api/v1/client/settings/personal-info',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: requestBody
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  //api/v1/client/tags
  it('API. Create a new category', () => {

  })

  //api/v1/client/tags/:tagId
  it('API. Get a category by ID', () => {

  })

  //api/v1/client/tags
  it('API. Get a list of all categories', () => {

  })

  //api/v1/client/tags/:tagId
  it('API. Update category by ID', () => {

  })

  //api/v1/client/tags/:tagId
  it('API. Delete category by ID', () => {

  })

  // api/v1/client/settings/account-delete
  it('API. Delete user', () => {
    cy.request({
      method: 'DELETE',
      url: baseURL + '/api/v1/client/settings/account-delete',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

});