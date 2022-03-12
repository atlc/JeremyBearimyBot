import attachSampleReactionsTo from "./samplereacts.js";
import replyAuthorRolesFrom from "./getpermissions.js";
import handleAddRoles from "./addpermissions.js";
import handleRemoveRoles from "./removepermissions.js";

const loadUpListeners = bot => {
    // Fires upon a new message being created. This only has specific items to listen for starting with `!`
    bot.on("messageCreate", async message => {
        switch (message.content) {
            case "!samplereacts":
                attachSampleReactionsTo(message);
                break;
            case "!checkroles":
                replyAuthorRolesFrom(message);
                break;
        }
    });

    bot.on("messageReactionAdd", async (reaction, user) => handleAddRoles(reaction, user));

    bot.on("messageReactionRemove", async (reaction, user) => handleRemoveRoles(reaction, user));
};

export default loadUpListeners;
