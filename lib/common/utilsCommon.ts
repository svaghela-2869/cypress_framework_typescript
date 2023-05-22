import dateformat from "dateformat";
import * as reporter from "./reporter";
import jp = require("jsonpath");

export function getTimeStamp(format?: string): string {
   if (format) {
      return dateformat(format);
   } else {
      return dateformat("yymmddHMs");
   }
}

export function getRandomNumber(minimumNumber: number, maximumNumber: number): number {
   return Math.floor(Math.random() * (maximumNumber - minimumNumber + 1) + minimumNumber);
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
