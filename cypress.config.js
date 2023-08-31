const { defineConfig } = require("cypress");
const { Client } = require('pg');


module.exports = defineConfig({
  projectId: "qctdgp",
  viewportHeight: 1024,
  viewportWidth: 1280,
  e2e: {
    experimentalStudio: true,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    defaultCommandTimeout: 10000,
    screenshotOnRunFailure: true,
    video: true,
    videoUploadOnPasses: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: "postgres",
            password: "1478236950",
            host: "http://138.68.122.100",
            database: "recipetoria",
            ssl: false,
            port: 5432
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows
        }
      })
    },
  },

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-qase-reporter',
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
    },
    cypressQaseReporterReporterOptions: {
      apiToken: 'e8f88c1b1e91313ea88f04f58af1e2a72eea12d941d904bccb0438c75352fbb7',
      projectCode: 'REC',
      logging: true,
      basePath: 'https://api.qase.io/v1',
      screenshotFolder: 'screenshots',
      sendScreenshot: true,
      runComplete: true,
      environmentId: 1,
      rootSuiteTitle: 'Cypress tests',
    },
  },
});


require('@applitools/eyes-cypress')(module);
