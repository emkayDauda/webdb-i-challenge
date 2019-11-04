const express = require("express");

const db = require("../data/dbConfig.js");

const accounts = express.Router();

accounts.get("/", (req, res) => {
  db("accounts")
    .then(accounts => res.status(201).json(accounts))
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});

accounts.get("/:id", idValidator, (req, res) => {
    res.status(201).json(req.valAccount)
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

function accountBodyValidator (req, res, next) {
    const {name, budget} = req.params;

    if (!Object.keys(req.body).length) {
        res.status(404).json({ error: true, message: "Request body empty" });
    }
    else if (!name) res.status(404).json({error: true, message: "Name is required"})
    else if (!budget) res.status(404).json({error: true, message: "Budget is required"})
    else {
        req.valAccBody = {name, budget}
        next()
    }
}

module.exports = accounts;
