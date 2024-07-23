describe("Frontend", () => {

    it("connect", () => {
        const url = Cypress.env("FRONTEND_URL");
        cy.visit(url);
    });

    it("delete card", () => {
        const url = Cypress.env("FRONTEND_URL");
        const topic = "Test Topic";
        const name = "John Doe";
        const imageUrl = "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png";
        const detail = "This is a detailed description";

        cy.visit(url);

        cy.get("[data-cy='input-topic']").should("be.visible").type(topic);
        cy.get("[data-cy='input-name']").should("be.visible").type(name);
        cy.get("[data-cy='input-link']").should("be.visible").type(imageUrl);
        cy.get("[data-cy='input-detail']").should("be.visible").type(detail);

        cy.get("[data-cy='submit']").should("be.visible").click();

        cy.wait(2000);

        cy.get("[data-cy='delete']").first().should("be.visible").click();
        
        cy.contains(topic).should("not.exist");
        cy.contains(name).should("not.exist");
        cy.contains(detail).should("not.exist");
    });

    it("submit", () => {
        const url = Cypress.env("FRONTEND_URL");
        const topic = "Test Topic";
        const name = "John Doe";
        const imageUrl = "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png";
        const detail = "This is a detailed description";

        cy.visit(url);

        cy.get("[data-cy='input-topic']")
        .should("be.visible")
        .type(topic);
        cy.get("[data-cy='input-name']")
        .should("be.visible")
        .type(name);
        cy.get("[data-cy='input-link']")
        .should("be.visible")
        .type(imageUrl);
        cy.get("[data-cy='input-detail']")
        .should("be.visible")
        .type(detail);

        cy.get("[data-cy='submit']")
        .should("be.visible")
        .click();

        cy.wait(2000);

        cy.get("[data-cy='card-container']")
            .first()
            .should('contain.text', `${topic} of ${name}`)
            .and('contain.text', detail);

    });

    it("reset", () => {
        const url = Cypress.env("FRONTEND_URL");
        const topic = "Test Topic";
        const name = "John Doe";
        const imageUrl = "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png";
        const detail = "This is a detailed description";

        cy.visit(url);

        cy.get("[data-cy='input-topic']")
        .should("be.visible")
        .type(topic);
        cy.get("[data-cy='input-name']")
        .should("be.visible")
        .type(name);
        cy.get("[data-cy='input-link']")
        .should("be.visible")
        .type(imageUrl);
        cy.get("[data-cy='input-detail']")
        .should("be.visible")
        .type(detail);

        cy.get("[data-cy='reset']")
        .should("be.visible")
        .click();

        cy.wait(2000);

        cy.get("[data-cy='input-topic']").should("not.contain", topic);
        cy.get("[data-cy='input-name']").should("not.contain", name);
        cy.get("[data-cy='input-detail']").should("not.contain", detail);
    });

    it("done", () => {
        const url = Cypress.env("FRONTEND_URL");
        const topic = "Test Topic";
        const name = "John Doe";
        const imageUrl = "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png";
        const detail = "This is a detailed description";

        cy.visit(url);

        cy.get("[data-cy='input-topic']").should("be.visible").type(topic);
        cy.get("[data-cy='input-name']").should("be.visible").type(name);
        cy.get("[data-cy='input-link']").should("be.visible").type(imageUrl);
        cy.get("[data-cy='input-detail']").should("be.visible").type(detail);

        cy.get("[data-cy='submit']").should("be.visible").click();

        cy.wait(2000);

        cy.get("[data-cy='done']").first().should("be.visible").click();
        
        cy.contains(topic);
        cy.contains(name);
        cy.contains(detail);
    });

})