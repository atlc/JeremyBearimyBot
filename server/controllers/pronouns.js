import config from "../conf/index.js";

const pronouns = async (message, client) => {
    if (!config.ALLOWED_USERS.includes(message.author.username)) return;
    try {
        const [star] = client.emojis.cache.filter(emoji => emoji.name === "star");

        const newMessage = await message.reply(
            `React to this message to select pronoun roles (as many as you like). You can change pronoun roles any time your pronouns change.\n\n✨\tshe/her\n:star:\the/him\n🌟\tthey/them\n🪐\tany pronouns\n☀️\task for pronouns`
        );

        console.log(star);
        await newMessage.react("✨");
        await newMessage.react(`${star[0]}`);
        await newMessage.react("🌟");
        await newMessage.react("🪐");
        await newMessage.react("☀️");
    } catch (error) {
        console.log("Error posting one or more of the emojis:\t", error);
    }
};

export default pronouns;
