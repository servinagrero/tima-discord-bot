import { Listener, Command, Config } from "../Interfaces";

import { Client, Collection } from "discord.js";

import configFile from "../config.json";

import path from "path";

import fs from "fs";

export default class Bot extends Client {
  public listeners_map: Collection<string, Listener> = new Collection();
  public commands_map: Collection<string, Command> = new Collection();
  public config: Config = configFile;

  public async init() {
    this.login(this.config.token)
      .then(() => {
        if (!this.user || !this.application) {
          process.exit(1);
        }
        console.log(`* Connected to Discord as ${this.user.username}!`);
      })
      .catch((err: Error) => {
        console.log(err);
        process.exit(1);
      });

    fs.readdir(
      path.join(__dirname, "../Listeners"),
      (err, listeners: string[]) => {
        if (err) throw new Error(err.message);
        listeners
          .filter((listener: string) => listener.endsWith(".ts"))
          .forEach(async (listener_file: string) => {
            try {
              const callback = await import(`../Listeners/${listener_file}`);
              callback.default(this);
              this.listeners_map.set(listener_file, callback.default);
              console.log(`*** Registered listener ${listener_file}`);
            } catch (err) {
              console.error(err);
            }
          });
      }
    );

    fs.readdir(
      path.join(__dirname, "../Commands"),
      (err, commands: string[]) => {
        if (err) throw new Error(err.message);
        commands
          .filter((commands: string) => commands.endsWith(".ts"))
          .forEach(async (command_file: string) => {
            try {
              const { command } = await import(`../Commands/${command_file}`);
              this.commands_map.set(command.data.name, command);
              console.log(`*** Registered command ${command_file}`);
            } catch (err) {
              console.error(err);
            }
          });
      }
    );
  }
}
