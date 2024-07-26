describe("Backend", () => {
  it("checks env", () => {
    cy.log(JSON.stringify(Cypress.env()));
  });

  it("checks CORS policy", () => {
    const url = Cypress.env("BACKEND_URL");
    cy.request({
      method: "GET",
      url: `${url}/todos`,
    }).then((res) => {
      expect(res.headers).to.not.have.property("access-control-allow-origin");
    });
  });

  it("fetches all todos", () => {
    const url = Cypress.env("BACKEND_URL");
    cy.request({
      method: "GET",
      url: `${url}/todos`,
    }).then((res) => {
      expect(res.body).to.be.an("array");
    });
  });

  it("creates a new todo and checks response fields", () => {
    const url = Cypress.env("BACKEND_URL") as string;

    cy.request({
      method: "POST",
      url: `${url}/todos`,
      body: {
        topic: "Test Topic",
        name: "John Doe",
        url: "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png",
        detail: "This is a detailed description",
        done: false,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res.body));
      expect(res.body).to.all.keys(
        "id",
        "topic",
        "name",
        "url",
        "detail",
        "done",
        "createdAt",
        "updatedAt"
      );
    });
  });

  it("deletes a todo", () => {
    const url = Cypress.env("BACKEND_URL");

    cy.request({
      method: "POST",
      url: `${url}/todos`,
      body: {
        topic: "Delete Test Topic",
        name: "Mark Doe",
        url: "https://example.com/delete.png",
        detail: "Description to be deleted",
        done: false,
      },
    }).then((res) => {
      const todo = res.body;

      cy.request({
        method: "DELETE",
        url: `${url}/todos/${todo.id}`,
      }).then((res) => {
        expect(res.body).to.have.property("message", "Todo deleted");
      });
    });
  });

  it("done", () => {
    const url = Cypress.env("BACKEND_URL");

    cy.request({
      method: "POST",
      url: `${url}/todos`,
      body: {
        topic: "Done Test Topic",
        name: "Jane Doe",
        url: "https://example.com/done.png",
        detail: "done",
        done: false,
      },
    }).then((res) => {
      const todo = res.body;

      cy.request({
        method: "PUT",
        url: `${url}/todos/${todo.id}`,
        body: {
          ...todo,
          done: true,
        },
      }).then((res) => {
        expect(res.body).to.have.property("done", true);
      });
    });
  });
});
