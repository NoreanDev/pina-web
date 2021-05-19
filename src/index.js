/* Express */
const express = require('express');
const app = express();

// Settings
app.set('port', 3000)

// Routes
require(`./web/routes/routes.js`);

app.listen(app.get('port'), () => console.log(`Express server listen on ${app.get('port')} port`));

/* Discord Bot */
require(`./bot/bot.js`);