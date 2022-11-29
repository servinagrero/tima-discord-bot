<div align='center'>
<h2>TIMA Discord Bot</h2>
</div>

# Getting started

Create the file `.env` at the root of the project containing the following values:

* `TOKEN=xxxxx`: Login token for the bot.
* `GUILD_ID="XXXXX"`: ID of the server.

Yarn should be installed to configure the project.

```shell
$ git clone https://github.com/servinagrero/tima-discord-bot.git
$ cd tima-discord-bot
$ yarn
```

In order to run the project.
```shell
$ yarn start # For production
$ yarn dev # For development
```

# Project structure

* `src/Interfaces/`: Type definitions used in the project.
* `src/Client/`: Implementation of the bot.
* `src/Listeners/`: Directory that contains the implementation of each listener. **Each file should implement a unique listener**.
