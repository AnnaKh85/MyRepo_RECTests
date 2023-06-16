const { defineConfig } = require("cypress");
const { Client } = require('pg');


module.exports = defineConfig({
  projectId: "qctdgp",
  viewportHeight: 1024,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: "postgres",
            password: "1478236950",
            host: "localhost",
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
});


require('@applitools/eyes-cypress')(module);
