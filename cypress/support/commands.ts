/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import cypress from "cypress";
// import "cypress-localstorage-commands";

Cypress.Commands.add("seedAndVisit", () => {
  cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
    fixture: "ingredients",
  });

  cy.visit("http://localhost:3000");
});

Cypress.Commands.add("sendRequestOrder", () => {
  cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
    fixture: "order",
  });
});

Cypress.Commands.add("getRequestUser", () => {
  cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
    fixture: "user.json",
  });
});

// Cypress.Commands.add("setToken", (token) => {
//   const refreshToken = { value: token };
//   window.localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
// });

// Cypress.Commands.add("sendRequestOrder", () => {
//   cy.intercept("POST", "/api/orders", (req) => {
//     req.reply({
//       statusCode: 200,
//       body: {
//         success: true,
//         order: {
//           _id: "order-id",
//           number: 1,
//           status: "done",
//           name: "Burger",
//           createdAt: Date.now(),
//         },
//       },
//     });
//   }).as("createOrder");

//   cy.get("[data-test=button-order]").contains("Оформить заказ").click();
//   cy.wait("@createOrder");
// });
