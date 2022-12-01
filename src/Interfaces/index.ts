import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import Bot from "../Client";

export interface Config {
  token: string;
  guild_id: string;
}

export interface Listener {
  (client: Bot): void;
}

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
}
