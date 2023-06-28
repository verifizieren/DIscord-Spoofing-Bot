require('dotenv').config();
const { Client, IntentsBitField, WebhookClient } = require('discord.js'); 
let spoofMode = false;

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const webhookClient = new WebhookClient({
    url: process.env.WEBHOOKURL
})

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is ready`)
});

client.on('messageCreate', (message) => {
   

    if (!message.webhookId && !message.author.bot && spoofMode) {
    let orgMessage = message; message.delete();

    webhookClient.send({
        content: `${orgMessage.content}`,
        username: `${orgMessage.author.username}`,
        avatarURL: `${orgMessage.author.avatarURL()}`,
    }); 
    };
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand) return;

    if (interaction.commandName === 'on') {
        spoofMode = true;
        interaction.reply('Message spoofing has been enabled.')
    };

    if (interaction.commandName === 'off') {
        spoofMode = false;
        interaction.reply('Message spoofing has been disabled.')
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('Pong')
    }
})

client.login(process.env.TOKEN);