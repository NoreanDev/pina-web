const express = require('express');
const Router = express.Router();

Router.get("/", (req, res) => {
    res.render(`${__dirname}/../views/index.ejs`);
});

module.exports = Router;