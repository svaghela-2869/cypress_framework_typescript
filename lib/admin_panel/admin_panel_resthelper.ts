import * as reporter from "../common/reporter";
import jp = require("jsonpath");

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
      cy.wrap(resFilePath).as(storeTokenVariable + "_file_path");
      cy.writeFile(resFilePath, response);
      reporter.pass("Response stored at [ " + resFilePath.split("/cypress_framework_typescript")[1] + " ]");

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
      cy.wrap(resFilePath).as(storeResponseBodyAsVariable + "_file_path");
      cy.writeFile(resFilePath, response);
      reporter.pass("Response stored at [ " + resFilePath.split("/cypress_framework_typescript")[1] + " ]");

      if (verifyStatus) {
         expect(response.status).deep.eq(verifyStatus);
         reporter.pass("Starus code [ " + verifyStatus + " ] verified.");
      }

      cy.wrap(response.body).as(`${storeResponseBodyAsVariable}`);
      reporter.pass("Response body stored as [ @" + storeResponseBodyAsVariable + " ]");
   });
}

export function postWithoutAuth(url: string, body: any, storeResponseBodyAsVariable: string, verifyStatus?: number) {
   reporter.info("Performing POST on API [ " + url + " ]");
   cy.request({
      method: "POST",
      url: url,
      body: JSON.parse(JSON.stringify(body, null, 4)),
   }).then(function (response) {
      let resFilePath = Cypress.config("downloadsFolder") + "/rest/" + storeResponseBodyAsVariable + ".json";
      cy.wrap(resFilePath).as(storeResponseBodyAsVariable + "_file_path");
      cy.writeFile(resFilePath, response);
      reporter.pass("Response stored at [ " + resFilePath.split("/cypress_framework_typescript")[1] + " ]");

      if (verifyStatus) {
         expect(response.status).deep.eq(verifyStatus);
         reporter.pass("Starus code [ " + verifyStatus + " ] verified.");
      }

      cy.wrap(response.body).as(`${storeResponseBodyAsVariable}`);
      reporter.pass("Response body stored as [ @" + storeResponseBodyAsVariable + " ]");
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
      body: JSON.parse(JSON.stringify(body, null, 4)),
   }).then(function (response) {
      let resFilePath = Cypress.config("downloadsFolder") + "/rest/" + storeResponseBodyAsVariable + ".json";
      cy.wrap(resFilePath).as(storeResponseBodyAsVariable + "_file_path");
      cy.writeFile(resFilePath, response);
      reporter.pass("Response stored at [ " + resFilePath.split("/cypress_framework_typescript")[1] + " ]");

      if (verifyStatus) {
         expect(response.status).deep.eq(verifyStatus);
         reporter.pass("Starus code [ " + verifyStatus + " ] verified.");
      }

      cy.wrap(response.body).as(`${storeResponseBodyAsVariable}`);
      reporter.pass("Response body stored as [ @" + storeResponseBodyAsVariable + " ]");
   });
}

export function verifyValueInJsonUsingJsonPath(jsonFilePathVariable: string, jPath: string, valueToVerify: string) {
   reporter.info("JPath using : " + jPath);
   cy.get("@" + jsonFilePathVariable + "_file_path").then(function (filePath) {
      cy.readFile(filePath.toString()).then((json) => {
         let jsonFileData: JSON = JSON.parse(JSON.stringify(json, null, 4));
         let dataReturned = jp.value(jsonFileData, jPath);
         reporter.pass("Data on JPath : " + dataReturned);
         if (dataReturned.toString() == valueToVerify) {
            reporter.pass("Value [ " + valueToVerify + " ] verified in json.");
         } else {
            reporter.fail("Value [ " + valueToVerify + " ] not found in json.");
         }
      });
   });
}

export function storeValueFromJson(jsonFilePathVariable: string, jPath: string, variableName: string) {
   reporter.info("JPath using : " + jPath);
   cy.get("@" + jsonFilePathVariable + "_file_path").then(function (filePath) {
      cy.readFile(filePath.toString()).then((json) => {
         let jsonFileData: JSON = JSON.parse(JSON.stringify(json, null, 4));
         let dataReturned = jp.value(jsonFileData, jPath);
         cy.wrap(dataReturned).as(variableName);
         reporter.pass("Value from json [ " + dataReturned.toString() + " ] stored as [ " + variableName + " ]");
      });
   });
}

export function deleteWithAuth(url: string, authentication: string, storeResponseBodyAsVariable: string, verifyStatus?: number) {
   cy.request({
      method: "DELETE",
      url: url,
      headers: {
         authorization: `${authentication}`,
      },
   }).then(function (response) {
      let resFilePath = Cypress.config("downloadsFolder") + "/rest/" + storeResponseBodyAsVariable + ".json";
      cy.wrap(resFilePath).as(storeResponseBodyAsVariable + "_file_path");
      cy.writeFile(resFilePath, response);
      reporter.pass("Response stored at [ " + resFilePath.split("/cypress_framework_typescript")[1] + " ]");

      if (verifyStatus) {
         expect(response.status).deep.eq(verifyStatus);
         reporter.pass("Starus code [ " + verifyStatus + " ] verified.");
      }

      cy.wrap(response.body).as(`${storeResponseBodyAsVariable}`);
      reporter.pass("Response body stored as [ @" + storeResponseBodyAsVariable + " ]");
   });
}
