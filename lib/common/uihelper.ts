import * as reporter from "../common/reporter";

export function launch_url(url: string) {
   cy.visit(url);
   reporter.pass("[ " + url + " ] launched.");
   return;
}

export function checkElementEnabledWithXpath(xpath: string) {
   cy.xpath(xpath).should("be.enabled");
   return;
}

export function checkElementEnabledWithCssSelector(selector: string) {
   cy.get(selector).should("be.enabled");
   return;
}

export function getElementWithXpath(xpath: string) {
   return cy.xpath(xpath);
}

export function clickElementWithXpath(xpath: string) {
   cy.xpath(xpath).click();
   reporter.pass("XPath element [ " + xpath + " ] clicked.");
   return;
}

export function clickElementWithCssSelector(selector: string) {
   cy.get(selector).click();
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
   getIframeBody(iframeSelector).find(fieldSelector).as("fieldSelector");
   cy.get("@fieldSelector").type(valueToEnter);
   reporter.pass("Value [ " + valueToEnter + " ] entered inside [ " + fieldSelector + " ] inside iFrame [ " + iframeSelector + " ]");
}
