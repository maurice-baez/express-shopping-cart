"use strict";

const express = require("express");
const app = express();

const db = require("./fakeDb");
const router = new express.Router();

const { NotFoundError } = require("./expressError");

app.use(express.json());

/** Return a list of items from the shopping cart*/
router.get("/", function (req, res) {
  return res.json({ items: db.items });
});




/** Add an item to the shopping cart */
router.post("/", function (req, res) {
  db.items.push(req.body);
  return res.status(201).json({ added: req.body });
});


/** Return a single item from the shopping cart */
router.get("/:name", function (req, res) {
  const curr_item = req.params.name;

  for (let item of db.items) {
    if (item.name === curr_item) {
      return res.json(item);
    }
  }
  throw new NotFoundError();
});


/** Update a single item from the shopping cart */
router.patch("/:name", function (req, res) {
  const curr_item = req.params.name;

  for (let item of db.items) {

    if (item.name === curr_item) {
      item.name = req.body.name || item.name;
      item.price = req.body.price || item.price;
      return res.json({ updated: item });
    }
  }
  throw new NotFoundError();
});

/** Delete an item from the shopping cart */
router.delete("/:name", function (req, res) {
  const curr_item = req.params.name;

  for (let i = 0; i < db.items.length; i++) {
    if (db.items[i].name === curr_item) {
      db.items.splice(i, 1);
      res.json({ message: "Deleted" });
    }
  }
  throw new NotFoundError();
});



module.exports = router;