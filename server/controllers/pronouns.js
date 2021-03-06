import config from "../conf/index.js";

const pronouns = async (message, client) => {
    if (!config.ALLOWED_USERS.includes(message.author.username)) return;
    try {
        const [star] = client.emojis.cache.filter(emoji => emoji.name === "star");

        const newMessage = await message.reply(
            `React to this message to select pronoun roles (as many as you like). You can change pronoun roles any time your pronouns change.\n\nâ¨\tshe/her\n:star:\the/him\nđ\tthey/them\nđŞ\tany pronouns\nâď¸\task for pronouns`
        );

        console.log(star);
        await newMessage.react("â¨");
        await newMessage.react(`${star[0]}`);
        await newMessage.react("đ");
        await newMessage.react("đŞ");
        await newMessage.react("âď¸");
    } catch (error) {
        console.log("Error posting one or more of the emojis:\t", error);
    }
};

export default pronouns;
