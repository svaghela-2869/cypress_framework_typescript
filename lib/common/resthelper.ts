// import * as utilsCommon from "./utilsCommon";
import * as reporter from "./reporter";

export function post(url: string, body: any, verifyResponse: boolean) {
   cy.request("POST", url, body).then(function (response) {
      reporter.info("POST Response Body : \n" + JSON.stringify(response.body, null, 2));
      if (verifyResponse) {
         verifyResponseData(response);
      }
   });
   // reporter.info("POST Response Body : \n" + JSON.stringify(response, null, 2));
}

export function verifyResponseData(response: any) {
   expect(response.status).to.eq(201);
}
