before(() => {
    const url = Cypress.env("BACKEND_URL");
    cy.request('POST', `${url}/todos`, {
      topic: "Initial Topic",
      name: "Initial Name",
      url: "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png",
      detail: "Initial Detail",
      done: false
    });
  });
  
  describe("Frontend", () => {
    const url = Cypress.env("FRONTEND_URL");
    const topic = "Test Topic";
    const name = "John Doe";
    const imageUrl = "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png";
    const detail = "This is a detailed description";
  
    it("connects", () => {
      cy.visit(url);
    });
  
    it("creates todo", () => {
      cy.visit(url);
      cy.get("[data-cy='input-topic']").type(topic);
      cy.get("[data-cy='input-name']").type(name);
      cy.get("[data-cy='input-link']").type(imageUrl);
      cy.get("[data-cy='input-detail']").type(detail);
      cy.get("[data-cy='submit']").click();
      cy.contains(`${topic} of ${name}`);
    });
  
    it("deletes todo", () => {
      cy.visit(url);
      cy.get("[data-cy='input-topic']").type(topic);
      cy.get("[data-cy='input-name']").type(name);
      cy.get("[data-cy='input-link']").type(imageUrl);
      cy.get("[data-cy='input-detail']").type(detail);
      cy.get("[data-cy='submit']").click();
      cy.wait(2000);
      cy.get("[data-cy='delete']").first().click();
      cy.contains(`${topic} of ${name}`).should("not.exist");
    });
  
    it("marks todo as done", () => {
      cy.visit(url);
      cy.get("[data-cy='input-topic']").type(topic);
      cy.get("[data-cy='input-name']").type(name);
      cy.get("[data-cy='input-link']").type(imageUrl);
      cy.get("[data-cy='input-detail']").type(detail);
      cy.get("[data-cy='submit']").click();
      cy.wait(2000);
      cy.get("[data-cy='done']").first().click();
      cy.get("[data-cy='card-container']").first().should('have.css', 'opacity', '0.5');
    });
  
    it("resets form", () => {
      cy.visit(url);
      cy.get("[data-cy='input-topic']").type(topic);
      cy.get("[data-cy='input-name']").type(name);
      cy.get("[data-cy='input-link']").type(imageUrl);
      cy.get("[data-cy='input-detail']").type(detail);
      cy.get("[data-cy='reset']").click();
      cy.get("[data-cy='input-topic']").should("have.value", "");
      cy.get("[data-cy='input-name']").should("have.value", "");
      cy.get("[data-cy='input-link']").should("have.value", "");
      cy.get("[data-cy='input-detail']").should("have.value", "");
    });
  });
  