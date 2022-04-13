"use strict";

const express = require("express");
const app = express();

const db = require("./fakeDb");
const router = new express.Router();

app.use(express.json());


router.get("/", function(req, res){
  debugger;
  return res.json({items : db.items});
})





router.post("/")
router.get("/:name")
router.patch("/:name")
router.delete("/:name")

module.exports = router;