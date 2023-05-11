export function info(value: string) {
   cy.addTestContext(" < INFO > " + value);
   cy.log("< INFO > " + value);
   return;
}

export function pass(value: string) {
   cy.addTestContext(" < PASS > " + value);
   cy.log("< PASS > " + value);
   return;
}

export function fail(value: string) {
   cy.addTestContext(" < ERROR > " + value);
   cy.log("< ERROR > " + value);
   throw new Error(value);
}
