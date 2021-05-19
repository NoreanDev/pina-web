require('dotenv').config()
const Discord = require('discord.js-light');
const client = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL
    }
});

let { readdirSync } = require('fs');

for (const evento of readdirSync(`${__dirname}/events/`)) {
    if (!evento.endsWith('.js')) {
        return console.log(`Eventos (Bot) | El archivo ${evento.toUpperCase()} no es un archivo JS.`);
    }

    let fileContents = require(`${__dirname}/events/${evento}`);
    client[fileContents.emitter](fileContents.name, fileContents.run.bind(null, client));
}

client.login(process.env.DISCORD_TOKEN)
.then(() => console.log(`Sesión iniciada como ${client.user.tag}`))
.catch((err) => console.error(`Error al iniciar sesión:`, err))