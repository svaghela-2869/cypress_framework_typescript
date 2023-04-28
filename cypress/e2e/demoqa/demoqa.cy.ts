/// <reference types='cypress'/>

let each_card_data = require("../../fixtures/demoqa/demoqa.json");
let book_store_data = require("../../fixtures/demoqa/demoqa_book_store.json");
let form_data = require("../../fixtures/demoqa/demoqa_form.json");

describe("Demo QA - Opening Each Card - Suite", function () {
   beforeEach("Launch Url", function () {
      cy.visit(each_card_data.url);
      cy.get(".card-body").should("have.length", 6);
   });

   it("Elements", function () {
      cy.get(".card-body").contains(each_card_data.cards.elements).click();
   });

   it("Forms", function () {
      cy.get(".card-body").contains(each_card_data.cards.forms).click();
   });

   it("Alerts, Frame & Windows", function () {
      cy.get(".card-body").contains(each_card_data.cards.alerts).click();
   });

   it("Widgets", function () {
      cy.get(".card-body").contains(each_card_data.cards.widget).click();
   });

   it("Interactions", function () {
      cy.get(".card-body").contains(each_card_data.cards.interactions).click();
   });

   it("Book Store Application", function () {
      cy.get(".card-body").contains(each_card_data.cards.bookStore).click();
   });
});

describe("Demo QA - Book Store - Suite", function () {
   beforeEach("Launch Url", function () {
      cy.visit(book_store_data.url);
      cy.get(".card-body").should("have.length", 6);
   });

   it("Book Store Application", function () {
      // login
      cy.get(".card-body").contains(book_store_data.cards.bookStore).click();
      cy.get("button").contains(book_store_data.button.login).click();
      cy.get('[id="userName"]').type(book_store_data.user.userName);
      cy.get('[id="password"]').type(book_store_data.user.password).type("{enter}");

      // verify user logged in
      cy.get("#userName-value").should("have.text", book_store_data.user.userName);

      // click book
      cy.get("span").contains(book_store_data.bookStoreCards.bookStore).click();
      cy.get("a").contains("Learning JavaScript Design Patterns").click({ force: true });

      // verify book details
      cy.get('[id="ISBN-wrapper"]').should("have.text", book_store_data.jsBook.isbn);
      cy.get('[id="title-wrapper"]').should("have.text", book_store_data.jsBook.title);
      cy.get('[id="author-wrapper"]').should("have.text", book_store_data.jsBook.author);

      // add book to collection
      cy.get("button").contains(book_store_data.button.addToCollection).click({ force: true });

      // verify book added in the collection
      cy.on("window:alert", function (txt) {
         expect(txt).to.contains("Book added to your collection.");
      });

      // remove book from collection
      cy.get("span").contains(book_store_data.bookStoreCards.profile).click();
      cy.get('[title="Delete"]').click();
      cy.get(".modal-body").should("have.text", "Do you want to delete this book?");
      cy.get("button").contains(book_store_data.button.ok).click();
      cy.on("window:alert", function (txt) {
         expect(txt).to.contains("Book deleted.");
      });

      // logout
      cy.get("button").contains(book_store_data.button.logout).click();
   });
});

describe("Demo QA - Form - Suite", function () {
   beforeEach("Launch Url", function () {
      cy.visit(form_data.url);
      cy.get(".card-body").should("have.length", 6);
   });

   it("Form Filling & Submit The Form", function () {
      // open form
      cy.get(".card-body").contains(form_data.cards.forms).click();
      cy.get("span").contains(form_data.formsCards.practiceForm).click();

      // enter data
      cy.get('[id="firstName"]').type(form_data.formData.firstName);
      cy.get('[id="lastName"]').type(form_data.formData.lastName);
      cy.get('[id="userEmail"]').type(form_data.formData.email);
      cy.get('[value="Male"]').check({ force: true });
      cy.get('[id="userNumber"]').type(form_data.formData.mobileNumber);
      cy.get("button").contains(form_data.button.submit).click({ force: true });
      cy.get("button").contains(form_data.button.close).click({ force: true });
   });
});
