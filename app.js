"use strict";

const express = require("express");
const app = express();

const db = require("./fakeDb");
const itemRoutes = require("./itemRoutes")

app.use(express.json());


app.use("/items", itemRoutes);


module.exports = app;





