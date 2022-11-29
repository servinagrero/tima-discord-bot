import { Client, Events } from "discord.js";

export default (client: Client): void => {
  client.once(Events.MessageCreate, async (message) => {
    const { channelId } = message;
    const user = message.author.username;
    if (user !== client.user!.username) {
      console.log(`Message from ${user}`);
    }
  });
};
