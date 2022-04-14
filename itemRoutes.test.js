const app = require("./app");
const db = require("./fakeDb");

const request = require("supertest");

let candy = { name : "Candy", price : 1.50};
let chocolate = { name : "Chocolate", price : 1.99};
let cheetos = { name: "Cheetos", price: 1.00 };



beforeEach(function() {
  db.items.push(candy, chocolate, cheetos);
});

afterEach(function() {
  db.items.length = 0;
})


test("Returns list of shopping cart items", async function () {

  const resp = await request(app).get("/items");
  debugger;
  expect(resp.body).toEqual({items : [candy, chocolate, cheetos]});
});

test("Adds item to the shopping cart", async function(){

    const resp = await request(app)
      .post("/items")
      .send({name: "Sour patch kids", price: 5.99});
  debugger;
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({added: {name: "Sour patch kids", price: 5.99} });
})

describe("PATCH /items/:name", function () {
  test("Updates item in the shopping cart", async function () {
    console.log(candy.name)
    const resp = await request(app)
      .patch(`/items/${candy.name}`)
      .send({ name: "updateTest", price: 1001 });
    debugger;
    console.log(chocolate.name)
    console.log(candy.name)
    expect(resp.body).toEqual({ updated: { name: "updateTest", price: 1001 } });
  });
})


  // test("Update only the name in the item", async function () {
  //   const resp = await request(app)
  //     .patch(`/items/${chocolate.name}`)
  //     .send({ name: "newChocolate" });

  //   expect(resp.body).toEqual({ updated: { name: "newChocolate", price: chocolate.price } });
  // });

  // test("Update only the price in the item", async function () {
  //   const resp = await request(app)
  //     .patch(`/items/${chocolate.name}`)
  //     .send({ price: 4.99 });

  //   expect(resp.body).toEqual({ updated: { name: chocolate.name, price: 4.99 } });
  // })
// })
