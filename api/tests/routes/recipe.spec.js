/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: "La milanesa a la napolitana es una milanesa con queso y salsa de tomate arriba"
};
const recipe2 = {
  name: 'Milanea con papas',
  summary: "La milanesa normal con papas fritas de guarnicion"
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(async () => { await Recipe.sync({ force: true }); await Recipe.create(recipe) });
  describe('GET /recipes', () => {
    it('should get 200', async () => {
      const data = await agent.get('/recipes');
      expect(data.statusCode).to.equal(200);
    }).timeout(15000);
  });

  describe("GET /recipes/id", () => {
    it("should get 400", async() => {
      const result = await agent.get("/recipes/" + 000);
      expect(result.statusCode).to.equal(400);
    });
    it("should get 200", async () => {
      const recipe = await Recipe.create(recipe2);
      const result = await agent.get("/recipes/" + recipe.id);
      expect(result.statusCode).to.equal(200)
    })
  })
});

