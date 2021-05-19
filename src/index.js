/* Express */
const express = require('express');
const path = require('path');

const app = express();
const routes = require(`./web/routes/routes.js`);

// Settings
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, `./web/views`));

// Routes
app.use('/', routes);

app.listen(app.get('port'), () => console.log(`Express server listen on ${app.get('port')} port`));

/* Discord Bot */
require(`./bot/bot.js`);