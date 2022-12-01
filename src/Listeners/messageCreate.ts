import Bot from "../Client";
import { Events } from "discord.js";

export default (client: Bot): void => {
  client.on(Events.MessageCreate, async (message) => {
    const user = message.author.username;
    if (client.user && user !== client.user.username) {
      console.log(`Message from ${user}: ${message.content}`);
    }
  });
};
