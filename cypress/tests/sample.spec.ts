describe(Cypress.spec.name, function () {
   it("your test name.", function () {
      // test steps
      cy.log(JSON.stringify(Cypress.browser, null, 4));
   });
});
