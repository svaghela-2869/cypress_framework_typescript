export function info(value: string) {
   cy.addTestContext("Info : " + value);
   cy.log("Info : " + value);
   return;
}

export function pass(value: string) {
   cy.addTestContext("Pass : " + value);
   cy.log("Pass : " + value);
   return;
}

export function fail(value: string) {
   cy.addTestContext("Error : " + value);
   cy.log("Error : " + value);
   throw new Error(value);
}
