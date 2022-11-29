import { Listener } from "../Interfaces";

import {
  Client,
  Collection,
  ChannelType,
  TextChannel,
  PermissionsBitField,
  Permissions,
} from "discord.js";

import "dotenv/config";

import path from "path";

import fs from "fs";

export default class Bot extends Client {
  public async init(token: string) {
    this.login(token)
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
              console.log(`*** Registered listener ${listener_file}`);
            } catch (err) {
              console.error(err);
            }
          });
      }
    );
  }
}
