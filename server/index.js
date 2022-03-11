import Eris from "eris";
import config from "./conf/index.js";

const { BOT_TOKEN, DISCORD_CLIENT_ID } = config;

const bot = new Eris(BOT_TOKEN, {
    intents: ["guildMessages"]
});

bot.on("ready", () => console.log("Bot online"));
bot.on("error", err => console.log(err));

// bot.registerCommand("assign", "assign", {
//     description: "Click 'em to pick 'em",
//     reactionButtons: [
//         {
//             emoji: "💯",
//             type: "edit",
//             response: "You know I always keep it 💯 myself"
//         }
//     ]
// });

bot.on("messageCreate", message => {
    if (message.content === "!zip") bot.createMessage(message.channel.id, "ZOOP");
    if (message.content === "!banned?") bot.createMessage(message.channel.id, "uWu no pwease");

    message.addReaction("🛠");
});

bot.on("interaction", interaction => {
    bot.createMessage(message.channel.id, JSON.stringify(interaction));
});

bot.connect();
