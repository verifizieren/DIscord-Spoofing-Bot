require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'enable',
        description: 'Enables message spoofing.',
    },
    {
        name: 'disable',
        description: 'Disables message spoofing.',
    }, 
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
        console.log('Slash commands registered');
    }   catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();