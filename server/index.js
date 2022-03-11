import { Client, Intents } from "discord.js";
import config from "./conf/index.js";

const { BOT_TOKEN, DISCORD_CLIENT_ID } = config;

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });

bot.once("ready", () => console.log("Bot online"));

bot.on("messageCreate", async message => {
    if (message.content === "!samplereacts") {
        try {
            await message.react("🦩");
            await message.react("🐖");
            await message.react("🔥");
            await message.react("🦕");
            await message.react("🐳");
            await message.react("👤");
            await message.react("👾");
            await message.react("🐙");
        } catch (error) {
            console.log("Error posting one or more of the emojis:\t", error);
        }
    }

    if (message.content === "!checkroles") {
        const currentRoleNames = message.member.roles.cache.map(role => `**${role.name.replace("@", "")}**`);
        const parsedRoleString = currentRoleNames.join(", ");
        message.reply(`${message.member.user.username}'s current roles include: ${parsedRoleString}.`);
    }
});

bot.on("messageReactionAdd", async (reaction, user) => {
    if (user.username === "CrappyReactionRoles") return;

    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("Something went wrong when fetching the message:", error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }

    const guild = reaction.message.guild;
    const reacter = guild.members.cache.get(user.id);

    switch (reaction.emoji.name) {
        case "🦩":
            break;
        case "🐖":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Pig").id);
            break;
        case "🔥":
            break;
        case "🦕":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Dino").id);
            break;
        case "🐳":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Whale").id);
            break;
        case "👤":
            break;
        case "👾":
            break;
        case "🐙":
            break;
        default:
            break;
    }

    // reaction.message.reply(`Holy fuck @${user.username} just reacted as a ${reaction.emoji.name}`);
});

bot.login(BOT_TOKEN);
