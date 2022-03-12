import config from "../conf/index.js";

const { BOT_USERNAME, CHANNEL_TO_WATCH } = config;

const addpermissions = async (reaction, user) => {
    if (user.username === BOT_USERNAME || reaction.message.channelId !== CHANNEL_TO_WATCH) return;

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
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Flamingo").id);
            break;
        case "🐖":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Pig").id);
            break;
        case "🔥":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Fire").id);
            break;
        case "🦕":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Dino").id);
            break;
        case "🐳":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Whale").id);
            break;
        case "👤":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Silhouette").id);
            break;
        case "👾":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Space Invader").id);
            break;
        case "🐙":
            reacter.roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Octopus").id);
            break;
        default:
            break;
    }
};

export default addpermissions;
