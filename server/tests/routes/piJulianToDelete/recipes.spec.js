const session = require('supertest-session');
const app = require('../../src/app.js')

const agent = session(app);

describe('GET request to /recipes endpoint.', () => {
  it('Responds with 400 if no query parameter is sent.', async () => {
    const response = await agent.get('/recipes')
    expect(response.statusCode).toBe(400);
  });

  it('Responds with 404 if the query parameter is invalid.', async () => {
    const response = await agent.get('/recipes?name=aaaaaaaa')
    expect(response.statusCode).toBe(404);
  });

  it('Responds with 200 if the query parameter is valid.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.statusCode).toBe(200);
  });

  it('No data from the db is sent.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[0].length).toBe(0);
  });

  it('Returns recipes data when responding with 200.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1].length).toBeGreaterThan(0);
  });

  it('Recipe has id property.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1][0]).toHaveProperty('id');
  });

  it('Recipe has title property.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1][0]).toHaveProperty('title');
  });

  it('Title property is a string.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    const value = response.body[1][0].title
    expect(value).toEqual(expect.any(String))
  });

  it('Recipe has image property.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1][0]).toHaveProperty('image');
  });

  it('Image property is a string.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    const value = response.body[1][0].image
    expect(value).toEqual(expect.any(String))
  });

  it('Recipe has diets property.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1][0]).toHaveProperty('diets');
  });

  it('Diets property is an array.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    const value = response.body[1][0].diets
    expect(value).toEqual(expect.any(Array))
  });

  it('Recipe has score property.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1][0]).toHaveProperty('score');
  });

  it('Score property is a number.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    const value = response.body[1][0].score
    expect(value).toEqual(expect.any(Number))
  });

  it('Recipe does not have property instructions.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1][0]).not.toHaveProperty('instructions');
  });

  it('Recipe does not have property summary.', async () => {
    const response = await agent.get('/recipes?name=pasta')
    expect(response.body[1][0]).not.toHaveProperty('summary');
  });
});

