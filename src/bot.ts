import { Client, ClientOptions } from "discord.js";
import 'dotenv/config'

console.log("Bot is starting.");

const client = new Client({
    intents: [ ]
});
console.log(client);

client.on('ready', async () => {
    if (!client.user || !client.application) {
        return;
    }
  	console.log(`Bot ${client.user.username} is ready`);
});

client.login(process.env.TOKEN);

