import * as reporter from "../common/reporter";

export function login(userName: string, password: string) {
   setTextInputText("Email", userName);
   setTextInputText("Password", password);
   clickButton("Sign In");
   cy.get(".header").should("be.visible");
   cy.get(".hidden > div").last().should("have.text", userName);
   reporter.pass("[ " + userName + " ] logged in sucessfully.");
   return;
}

export function logout() {
   cy.get(".avatar").click();
   cy.get("span").contains("Sign Out").first().click();
   reporter.pass("Logged out sucessfully.");
   return;
}

// split menus with '>'
export function clickMenuItem(menu: string) {
   let menuArray = menu.split(">");
   for (let i = 0; i < menuArray.length; i++) {
      let currentMenu = menuArray[i].trim();
      cy.contains(".menu > div", currentMenu).contains("span", currentMenu).click();
      reporter.pass("[ " + currentMenu + " ] menu clicked.");
   }
   return;
}

export function clickButton(name: string) {
   cy.xpath("//button[.='" + name + "']").click();
   reporter.pass("[ " + name + " ] button clicked.");
   return;
}

export function setTextInputText(labelName: string, value: string, placeHolder?: string) {
   if (placeHolder) {
      cy.xpath("//input[@placeHolder='" + placeHolder + "']")
         .first()
         .type(value);
      reporter.pass("[ " + value + " ] entered in [ " + placeHolder + " ] input box.");
   } else {
      cy.xpath("(//label[contains(text(),'" + labelName + "')]//following::input)")
         .first()
         .type(value);
      reporter.pass("[ " + value + " ] entered in [ " + labelName + " ] input box.");
   }
   return;
}

export function selectOneChoice(labelName: string, optionToSelect: string) {
   cy.contains("label", labelName).parent().find(".select__control input").click();
   cy.contains(".ml-2", optionToSelect).click();
   reporter.pass("[ " + optionToSelect + " ] selected from [ " + labelName + " ] select one choice.");
   return;
}

// give row values to be verified with semicolon ; seperated
export function verifyRowValueExistsInTable(values: string, tableSortable: boolean) {
   const eachValues: string[] = values.split(";");
   var valuesFound = 0;
   var foundAtRow = -1;
   if (tableSortable) {
      cy.wait(1000);
      cy.get(".cursor-pointer > span").should("be.visible");
      cy.get(".transform").should("not.exist");
   }
   cy.get("main table tbody tr")
      .should("be.visible")
      .each(function ($ele, index) {
         const rowText = $ele.text();
         cy.log("Row Text : " + rowText);
         for (let i = 0; i < eachValues.length; i++) {
            if (rowText.toLowerCase().includes(eachValues[i].toLowerCase())) {
               valuesFound++;
            }
         }
         if (Number(valuesFound) == Number(eachValues.length)) {
            foundAtRow = index;
            return false;
         } else {
            valuesFound = 0;
            return;
         }
      })
      .then(function () {
         if (foundAtRow != -1) {
            let rowSelector = "main table tbody tr:nth-child(" + Number(foundAtRow + 1) + ")";
            cy.get(rowSelector).scrollIntoView();
            reporter.pass("[ " + eachValues + " ] found in row " + Number(foundAtRow + 1) + ".");
            return;
         } else {
            reporter.fail("[ " + eachValues + " ] not found in any row.");
            return;
         }
      });
}

// give unique value of row before > and then give the checkbox names to be checked with semicolon ; seperated
export function clickCheckBoxInTable(uniqueRowText: string) {
   let checkBoxToCheck: string[] = uniqueRowText.split(">")[1].trim().split(";");
   uniqueRowText = uniqueRowText.split(">")[0].trim();
   var foundAtRow = -1;
   cy.wait(1000);
   cy.get("main table tbody tr")
      .should("be.visible")
      .each(function ($ele, index) {
         const rowText = $ele.text();
         cy.log("Row Text : " + rowText);
         if (rowText.toLowerCase().includes(uniqueRowText.toLowerCase())) {
            foundAtRow = index;
            return false;
         }
         return;
      })
      .then(function () {
         if (foundAtRow != -1) {
            let rowSelector = "main table tbody tr:nth-child(" + Number(foundAtRow + 1) + ")";
            for (let i = 0; i < checkBoxToCheck.length; i++) {
               cy.get(rowSelector).scrollIntoView();
               cy.get(rowSelector + " #" + checkBoxToCheck[i].toLowerCase()).check();
               reporter.pass("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", and checkbox [ " + checkBoxToCheck[i] + " ] checked.");
               return;
            }
         } else {
            reporter.fail("[ " + uniqueRowText + " ] not found in any row.");
            return;
         }
      });
}

// give unique value of row before > and then give the button name to be clicked
export function performActionInUserTable(uniqueRowText: string, tableSortable: boolean) {
   let actionToPerform: string = uniqueRowText.split(">")[1].trim();
   uniqueRowText = uniqueRowText.split(">")[0].trim();
   var foundAtRow = -1;
   if (tableSortable) {
      cy.wait(1000);
      cy.get(".cursor-pointer > span").should("be.visible");
      cy.get(".transform").should("not.exist");
      cy.wait(1000);
   }
   cy.get("main table tbody tr")
      .should("be.visible")
      .each(function ($ele, index) {
         const rowText = $ele.text();
         cy.log("Row Text : " + rowText);
         if (rowText.toLowerCase().includes(uniqueRowText.toLowerCase())) {
            foundAtRow = index;
            return false;
         }
         return;
      })
      .then(function () {
         if (foundAtRow != -1) {
            let rowSelector = "main table tbody tr:nth-child(" + Number(foundAtRow + 1) + ")";
            cy.get(rowSelector).scrollIntoView();
            if (String(actionToPerform).toLowerCase() == "edit") {
               cy.get(rowSelector + " button:nth-child(1)").click();
               reporter.pass("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", and [ edit ] clicked.");
            } else if (String(actionToPerform).toLowerCase() == "delete") {
               cy.get(rowSelector + " button:nth-child(2)").click();
               reporter.pass("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", and [ delete ] clicked.");
            } else {
               reporter.fail("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", but given action button is not found.");
            }
            return;
         } else {
            reporter.fail("[ " + uniqueRowText + " ] not found in any row.");
            return;
         }
      });
}

export function verifyReadOnlyText(value: string) {
   cy.xpath("//*[text()='" + value + "']").should("be.visible");
   reporter.pass("Text [ " + value + " ] present on ui.");
   return;
}

export function clickLink(value: string) {
   cy.xpath("//a[.='" + value + "']").click();
   reporter.pass("[ " + value + " ] link clicked.");
   return;
}

export function verifyToastMsgExists(value: string) {
   var toastFoundAt = -1;
   cy.get(".toast-wrapper", { timeout: 5000 })
      .each(function ($ele, index) {
         const toastMsg = $ele.text();
         cy.log("Toast Text : " + toastMsg);
         if (toastMsg.toLowerCase().includes(value.toLowerCase())) {
            toastFoundAt = index;
            return false;
         }
         return;
      })
      .then(function () {
         if (toastFoundAt != -1) {
            reporter.pass("Toast [ " + value + " ] found.");
         } else {
            reporter.fail("Toast [ " + value + " ] not found.");
         }
         return;
      });
}

export function checkElementEnabledWithXpath(xpath: string) {
   cy.xpath(xpath).should("be.enabled");
   reporter.pass("XPath element [ " + xpath + " ] enabled.");
   return;
}

export function checkElementEnabledWithCssSelector(selector: string) {
   cy.get(selector).should("be.enabled");
   reporter.pass("Selector element [ " + selector + " ] is enabled.");
   return;
}

// give unique value of row before > and then give the button name to be clicked
export function performActionInRolesTable(uniqueRowText: string, tableSortable: boolean) {
   let actionToPerform: string = uniqueRowText.split(">")[1].trim();
   uniqueRowText = uniqueRowText.split(">")[0].trim();
   var foundAtRow = -1;
   if (tableSortable) {
      cy.wait(1000);
      cy.get(".cursor-pointer > span").should("be.visible");
      cy.get(".transform").should("not.exist");
      cy.wait(1000);
   }
   cy.get("main table tbody tr")
      .should("be.visible")
      .each(function ($ele, index) {
         const rowText = $ele.text();
         cy.log("Row Text : " + rowText);
         if (rowText.toLowerCase().includes(uniqueRowText.toLowerCase())) {
            foundAtRow = index;
            return false;
         }
         return;
      })
      .then(function () {
         if (foundAtRow != -1) {
            let rowSelector = "main table tbody tr:nth-child(" + Number(foundAtRow + 1) + ")";
            cy.get(rowSelector).scrollIntoView();
            if (String(actionToPerform).toLowerCase() == "edit") {
               cy.get(rowSelector + " button:nth-child(1)").click();
               reporter.pass("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", and [ edit ] clicked.");
            } else if (String(actionToPerform).toLowerCase() == "view") {
               cy.get(rowSelector + " button:nth-child(2)").click();
               reporter.pass("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", and [ view ] clicked.");
            } else if (String(actionToPerform).toLowerCase() == "delete") {
               cy.get(rowSelector + " button:nth-child(3)").click();
               reporter.pass("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", and [ delete ] clicked.");
            } else {
               reporter.fail("[ " + uniqueRowText + " ] found in row " + Number(foundAtRow + 1) + ", but given action button is not found.");
            }
            return;
         } else {
            reporter.fail("[ " + uniqueRowText + " ] not found in any row.");
            return;
         }
      });
}
