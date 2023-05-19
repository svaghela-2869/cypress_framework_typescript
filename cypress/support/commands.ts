/// <reference types="cypress" />

import "@cypress/xpath";
import "cypress-mochawesome-reporter/register";
import "cypress-iframe";
require("cypress-terminal-report/src/installLogsCollector")();
require("@cypress/grep")();
require("cypress-plugin-api");

// beforeEach(function () {
//    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
// });
