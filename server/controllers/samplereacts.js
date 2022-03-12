const samplereacts = async message => {
    if (message.author.username !== "ATLC") return;
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
};

export default samplereacts;
