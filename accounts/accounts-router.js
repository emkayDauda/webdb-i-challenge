const express = require("express");

const db = require("../data/dbConfig.js");

const accounts = express.Router();

accounts.get("/", (req, res) => {
  db("accounts")
    .then(accounts => res.status(201).json(accounts))
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});


function idValidator(req, res, next) {
  const { id } = req.params;
  if (id) {
    db("accounts")
      .where("accounts.id", id)
      .first()
      .then(account => {
        if (account) {
          req.valAccount = account;
          next();
        } else {
          res
            .status(404)
            .json({ error: true, message: "Account with that ID not found" });
        }
      });
  }
}

module.exports = accounts;
