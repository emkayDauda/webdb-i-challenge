const express = require("express");

const db = require("../data/dbConfig.js");

const accounts = express.Router();

accounts.get("/", (req, res) => {
  db("accounts")
    .then(accounts => res.status(201).json(accounts))
    .catch(err =>
      res
        .status(500)
        .json({ error: true, message: "Error occurred with server" })
    );
});

module.exports = accounts;
