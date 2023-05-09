import * as reporter from "../common/reporter";

export function storeLoginToken(username: string, password: string, storeTokenVariable: string) {
   cy.request({
      method: "POST",
      url: "https://czbe.qa.webcluesstaging.com/api/v1/auth/login",
      body: {
         email: `${username}`,
         password: `${password}`,
         checked: "true",
      },
   }).then(function (response) {
      let resFilePath = Cypress.config("downloadsFolder") + "/rest/" + storeTokenVariable + ".json";
      cy.writeFile(resFilePath, response);
      reporter.pass("Login Response stored at [ " + resFilePath + " ]");

      expect(response.status).deep.eq(201);
      reporter.pass("Starus code [ 201 ] verified.");

      cy.wrap(response.body.token).as(`${storeTokenVariable}`);
      reporter.pass("Login token stored as [ @" + storeTokenVariable + " ]");
   });
}

export function getWithAuth(url: string, authentication: string, storeResponseBodyAsVariable: string, verifyStatus?: number) {
   reporter.info("Performing GET on API [ " + url + " ]");
   cy.request({
      method: "GET",
      url: `${url}`,
      headers: {
         authorization: `${authentication}`,
      },
   }).then(function (response) {
      let resFilePath = Cypress.config("downloadsFolder") + "/rest/" + storeResponseBodyAsVariable + ".json";
      cy.writeFile(resFilePath, response);
      reporter.pass("GET Response stored at [ " + resFilePath + " ]");

      if (verifyStatus) {
         expect(response.status).deep.eq(verifyStatus);
         reporter.pass("Starus code [ " + verifyStatus + " ] verified.");
      }

      cy.wrap(response.body).as(`${storeResponseBodyAsVariable}`);
      reporter.pass("GET Response body stored as [ @" + storeResponseBodyAsVariable + " ]");
   });
}

export function postWithoutAuth(url: string, body: any, storeResponseBodyAsVariable: string, verifyStatus?: number) {
   reporter.info("Performing POST on API [ " + url + " ]");
   cy.request({
      method: "POST",
      url: url,
      body: JSON.parse(JSON.stringify(body, null, 2)),
   }).then(function (response) {
      let resFilePath = Cypress.config("downloadsFolder") + "/rest/" + storeResponseBodyAsVariable + ".json";
      cy.writeFile(resFilePath, response);
      reporter.pass("POST Response stored at [ " + resFilePath + " ]");

      if (verifyStatus) {
         expect(response.status).deep.eq(verifyStatus);
         reporter.pass("Starus code [ " + verifyStatus + " ] verified.");
      }

      cy.wrap(response.body).as(`${storeResponseBodyAsVariable}`);
      reporter.pass("POST Response body stored as [ @" + storeResponseBodyAsVariable + " ]");
   });
}

export function postWithAuth(url: string, authentication: string, body: any, storeResponseBodyAsVariable: string, verifyStatus?: number) {
   reporter.info("Performing POST on API [ " + url + " ]");
   cy.request({
      method: "POST",
      url: url,
      headers: {
         authorization: `${authentication}`,
      },
      body: JSON.parse(JSON.stringify(body, null, 2)),
   }).then(function (response) {
      let resFilePath = Cypress.config("downloadsFolder") + "/rest/" + storeResponseBodyAsVariable + ".json";
      cy.writeFile(resFilePath, response);
      reporter.pass("POST Response stored at [ " + resFilePath + " ]");

      if (verifyStatus) {
         expect(response.status).deep.eq(verifyStatus);
         reporter.pass("Starus code [ " + verifyStatus + " ] verified.");
      }

      cy.wrap(response.body).as(`${storeResponseBodyAsVariable}`);
      reporter.pass("POST Response body stored as [ @" + storeResponseBodyAsVariable + " ]");
   });
}
