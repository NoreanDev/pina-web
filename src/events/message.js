const Discord = require('discord.js-light');
module.exports = {
    name: 'message',
    emitter: 'on',
    run: (client, message) => {
        if (message.author.bot || message.channel.type === 'dm') return;

        let prefix = "p?";

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        let cmd = client.commands.get(command) || client.commands.find((c) => c.alias && c.alias.includes(command));
        if (!cmd) return;

        if (cmd.onlyDev && !client.devs.includes(message.author.id)) return;
        if (cmd.args > args.length) return message.reply(`Te faltaron argumentos!\nUso correcto: \`${prefix}${cmd.uso}\``);

        try {
            cmd.run(Discord, client, message, args);
        } catch (error) {
            console.log(`Error con el comando ${cmd.name}: ${error}`);
        }
}}