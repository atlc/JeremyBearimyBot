import fs from "fs";
import path from "path";

const config = {};

if (process.env.NODE_ENV === "production") {
    // config["DISCORD_CLIENT_ID"] = process.env.DISCORD_CLIENT_ID;
    // config["DISCORD_CLIENT_TOKEN"] = process.env.DISCORD_CLIENT_TOKEN;
    config["BOT_TOKEN"] = process.env.BOT_TOKEN;
    config["BOT_USERNAME"] = process.env.BOT_USERNAME;
    config["CHANNEL_TO_WATCH"] = process.env.CHANNEL_TO_WATCH;
    config["ALLOWED_USERS"] = process.env.ALLOWED_USERS;
    // config["PERMISSIONS_INT"] = process.env.PERMISSIONS_INT;
    // config["GUILD_ID"] = process.env.GUILD_ID;
} else {
    console.log("mode:\t" + process.env.NODE_ENV);
    try {
        const env = fs.readFileSync(path.join(path.resolve(), ".env")).toString();
        const kvpGroups = env.split("\n").map(pair => pair.split("="));

        for (const [key, val] of kvpGroups) {
            config[key] = val;
        }
    } catch (error) {
        console.log(error);
    }
}

export default config;
