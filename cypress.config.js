const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'aucg3c',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
