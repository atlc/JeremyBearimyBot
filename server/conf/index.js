import fs from "fs";
import path from "path";

const config = {};

try {
    const env = fs.readFileSync(path.join(path.resolve(), ".env")).toString();
    const kvpGroups = env
        .split("\n")
        .map(pair => pair.split("="))
        .filter(arr => arr.length && arr[0]);

    for (const [key, val] of kvpGroups) {
        config[key] = val;
    }

    if (process.env.NODE_ENV === "production") {
        config["CHANNEL_TO_WATCH"] = process.env.CHANNEL_TO_WATCH;
        config["GUILD_ID"] = process.env.GUILD_ID;
        config["ALLOWED_USERS"] = process.env.ALLOWED_USERS;
    } else {
        config["CHANNEL_TO_WATCH"] = process.env.DEV_CHANNEL_TO_WATCH;
        config["GUILD_ID"] = process.env.DEV_GUILD_ID;
        config["ALLOWED_USERS"] = process.env.DEV_ALLOWED_USERS;
    }
} catch (error) {
    console.log(error);
}

export default config;
