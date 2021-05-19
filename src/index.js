/* Express */
const express = require('express');
const path = require('path');

const app = express();
const routes = require(`./web/routes/routes.js`);

// Settings
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, `web/views`));
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(__dirname, 'web/public')));

// Routes
app.use('/', routes);
app.get('*', (req, res) => {
    res.status(404).sendFile(`${__dirname}/views/404.html`);
});

app.listen(app.get('port'), () => console.log(`Express server listen on ${app.get('port')} port`));

/* Discord Bot */
require(`./bot/bot.js`);