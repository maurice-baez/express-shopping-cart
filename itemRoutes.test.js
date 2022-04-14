const app = require("./app");
const db = require("./fakeDb");

const request = require("supertest");

let candy = { name : "Candy", price : 1.50};
let chocolate = { name : "Chocolate", price : 1.99};
let cheetos = { name : "Cheetos", price : 1.00};

beforeEach(function() {
  db.items.push(candy, chocolate, cheetos);
});

afterEach(function() {
  db.items.splice(0,db.items.length)
})


test("Returns list of shopping cart items", async function () {

  const resp = await request(app).get("/items");

  expect(resp.body).toEqual({items: [candy, chocolate, cheetos]});
});

test("Adds item to the shopping cart", async function(){

    const resp = await request(app)
      .post("/items")
      .send({name: "Sour patch kids", price: 5.99});

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({added: {name: "Sour patch kids", price: 5.99} });
})


test("Updates item in the shopping cart", async function(){

  const resp = await request(app)
    .patch(`/items/${chocolate.name}`)
    .send({name: "updateTest", price: 1001});

  expect(resp.body).toEqual({updated: {name: "updateTest", price: 1001} })

})