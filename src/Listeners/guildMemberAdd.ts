import { Client, Events, ChannelType, TextChannel } from "discord.js";

export default (client: Client): void => {
  client.once(Events.GuildMemberAdd, async (member) => {
    client.guilds.fetch(process.env.GUILD_ID!).then(async (guild) => {
      const { ownerId } = guild;

      const msg: Array<string> = [
        `Hello ${member.user.username}.`,
        "Welcome to the official TIMA Discord server.",
        "Please see the rules at <#1044639387977273415>",
        `For any questions, please contant the administrator <@${ownerId}>.`,
      ];

      const general_ch = client.channels.cache.find(
        (c) => c.type === ChannelType.GuildText && c.name === "general"
      ) as TextChannel;
      general_ch.send(msg.join("\n"));
    });
  });
};
