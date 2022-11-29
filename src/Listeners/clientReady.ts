import { Client, Events } from "discord.js";

export default (client: Client): void => {
  client.once(Events.ClientReady, async () => {
    if (!client.user || !client.application) {
      return;
    }

    console.log(`* Started application`);
  });
};
