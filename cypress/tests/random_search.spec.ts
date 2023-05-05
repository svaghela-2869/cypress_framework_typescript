import { Random } from "random-test-values";
import * as reporter from "../../lib/common/reporter";

describe("Random Google Search", function () {
   it("Random Text Search.", function () {
      for (let i = 0; i < 5; i++) {
         cy.visit("https://www.google.com/");
         let randomText = Random.String();
         cy.get("[name='q']").type(randomText + "{enter}");
         reporter.pass("[ " + randomText + " ] search.");
      }
   });
});
