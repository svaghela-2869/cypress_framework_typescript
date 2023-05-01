import * as reporter from "../common/reporter";
import "@cypress/xpath";

export function launch_url(url: string) {
   cy.visit(url);
   reporter.pass("[ " + url + " ] launched.");
   return;
}

export function clickElementWithXpath(xpath: string) {
   cy.xpath(xpath)
      .click()
      .then(function () {
         cy.wait(500);
      });
   reporter.pass("XPath element [ " + xpath + " ] clicked.");
   return;
}

export function clickElementWithCssSelector(selector: string) {
   cy.get(selector)
      .click()
      .then(function () {
         cy.wait(500);
      });
   reporter.pass("Selector element [ " + selector + " ] clicked.");
   return;
}

const getIframeDocument = function (iframeSelector: string) {
   return cy.get(iframeSelector).its("0.contentDocument").should("exist");
};

const getIframeBody = function (iframeSelector: string) {
   return getIframeDocument(iframeSelector).its("body").should("not.be.undefined").then(cy.wrap);
};

export function typeContentInIFrame(iframeSelector: string, fieldSelector: string, valueToEnter: string) {
   getIframeBody(iframeSelector).find(fieldSelector).type(valueToEnter);
   reporter.pass("Value [ " + valueToEnter + " ] entered inside [ " + fieldSelector + " ] inside iFrame [ " + iframeSelector + " ]");
}
