require('dotenv').config();
const Discord = require('discord.js-light');
const client = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL
    },
    cacheEmojis: false,
    cacheOverwrites: false,
    cachePresences: false,
    cacheRoles: false,
    cacheChannels: false,
    cacheGuilds: true,
    presence: {
        activity: {
            name: `${process.env.URL}`,
            type: "WATCHING"
        },
        status: "idle"
    }
});

client.commands = new Discord.Collection();
client.devs = [
    "648654138929840164", // Rojito
    "749785464923488348" // Norean
];

let { readdirSync } = require('fs');

// Bot events
for (const event of readdirSync(`${__dirname}/events/`)) {
    if (!event.endsWith('.js')) {
        return console.log(`Events (Bot) | The file ${evento.toUpperCase()} isn't JS file.`);
    }

    let fileContents = require(`${__dirname}/events/${event}`);
    client[fileContents.emitter](fileContents.name, fileContents.run.bind(null, client));
}

// Bot commands
for (const subfolder of readdirSync(`${__dirname}/commands/`)) {
    for (const command of readdirSync(`${__dirname}/commands/${subfolder}/`)) {
        let fileContents = require(`${__dirname}/commands/${subfolder}/${command}`);

        client.commands.set(fileContents.name, fileContents);
    }
}


const express = require('express');
const path = require('path');

const app = express();
const routes = require(`./routes/routes.js`);

app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, `/views`));
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'name', resave: false, saveUninitialized: false }));
app.use((req, res, next) => { 
    req.client = client,
    next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);
app.get('*', (req, res) => {
    res.status(404).sendFile(`${__dirname}/views/404.html`);
});

const session = require('express-session');
const passport = require('passport');
let { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const scopes = ['identify', 'guilds'];

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: scopes,
    callbackURL: `${process.env.URL}/login`
}, 
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(null, profile);
        });
    }
));

app.listen(app.get('port'), () => {
    console.log(`Express server listen on ${app.get('port')} port`);

    client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log(`Sesión iniciada como ${client.user.username}`))
    .catch((err) => console.log(`Error al iniciar sesión: ${err}`))

});