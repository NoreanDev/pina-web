module.exports = {
    name: 'ready',
    emitter: 'on',
    run: async (client) => {
        console.log(`¡${client.user.username} listo!`);

        const rootdb = require('../database/connection.js');
        rootdb.then(() => console.log(`${client.user.tag} conectado a MongoDB`));
}}