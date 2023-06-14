/// <reference types="Cypress" />

describe('API. E2E testing', () => {
  let token;
  const baseURL = Cypress.env('testAPI_url')
  const fixtureFile = 'dataForAPITests.json'
  let userExist = false;
  let skipTest = false;

  beforeEach(() => {
    cy.fixture(fixtureFile).then((fixtureData) => {
      const { email, name } = fixtureData;
      const sqlQuery = `SELECT id, email, name, password FROM public.application_user WHERE email = '${email}' and name = '${name}';`;

      cy.task("connectDB", sqlQuery)
        .then((dbResponse) => {
          const existingUser = dbResponse.length > 0;
          cy.log(existingUser)
          if (existingUser) {
            //cy.log('User exists, all tests are skipped');
            userExist = true;
            skipTest = true;
            //Cypress.runner.stop();
          }
        });
    });
  });

  // api/v1/auth/register
  it('API. Register a new user', () => {
    if (skipTest) {
      cy.log('User does not exist. Skipping test.')
      return
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
      skipTest = true;
      return
    }
  });

  // api/v1/client/settings
  it('API. Get User personal information', () => {
    if (userExist) {
      cy.request({
        method: 'GET',
        url: baseURL + '/api/v1/client/settings',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    } else {
      cy.log('User does not exist. Skipping test.')
      skipTest = true;
      return
    }
  });

  // api/v1/client/settings/personal-info
  it('API. Update user name', () => {

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

    if (userExist) {
      cy.request({
        method: 'DELETE',
        url: baseURL + '/api/v1/client/settings/account',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    } else {
      cy.log('User does not exist. Skipping test.')
      skipTest = true;
      return
    }

  });

});