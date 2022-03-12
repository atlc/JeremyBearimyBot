import { Client, Intents } from "discord.js";
import config from "./conf/index.js";
import loadUpListeners from "./controllers/index.js";

const { BOT_TOKEN } = config;

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });

bot.once("ready", () => console.log("Bot online"));

loadUpListeners(bot);

bot.login(BOT_TOKEN);
