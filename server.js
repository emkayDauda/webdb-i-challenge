const express = require('express');

const accountsRouter = require('./accounts/accounts-router')
const server = express();

server.use(express.json());

server.use('/api/accounts/', accountsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to Accounts API</h2>`)
})

module.exports = server;