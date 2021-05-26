const express = require('express');
const app = express();
const router = require(`./router/router.js`);
const path = require('path');

// Config
app.set("port", 3000);
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, `/views`))
app.engine("html", require('ejs').renderFile);

// Routes
app.use("/", router);

// Server listen
app.listen(app.get("port"), () => {
    console.log(`Servidor de express alojado en el puerto ${app.get("port")}`)
});