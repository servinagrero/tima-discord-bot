import Bot from "../Client";
import { REST, Routes, Events } from "discord.js";

export default (client: Bot): void => {
  client.once(Events.ClientReady, async () => {
    if (client.user === undefined || client.application === undefined) {
      return;
    }
    console.log(`* Started application`);

    const rest = new REST({ version: "10" }).setToken(client.config.token);

    try {
      console.log(`** Started refreshing application (/) commands.`);

      rest
        .put(
          Routes.applicationGuildCommands(
            client.user!.id,
            client.config.guild_id
          ),
          { body: client.commands_map.mapValues((c) => c.data).toJSON() }
        )
        .then((data: any) => {
          console.log(
            `** Successfully reloaded ${data.length} application (/) commands.`
          );
        });
    } catch (error) {
      console.error(error);
    }
  });
};
