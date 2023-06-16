require('dotenv').config();
const { Client, IntentsBitField, WebhookClient } = require('discord.js'); 

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
   

    if (!message.webhookId && !message.author.bot) {
    let orgMessage = message; message.delete();
    
    webhookClient.send({
        content: `${orgMessage.content}`,
        username: `${orgMessage.author.username}`,
        avatarURL: `${orgMessage.author.avatarURL()}`,
    }); 
    };
});

client.login(process.env.TOKEN);