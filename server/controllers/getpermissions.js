const getpermissions = message => {
    const currentRoleNames = message.member.roles.cache.map(role => `**${role.name.replace("@", "")}**`);
    const parsedRoleString = currentRoleNames.join(", ");
    message.reply(`${message.member.user.username}'s current roles include: ${parsedRoleString}.`);
};

export default getpermissions;
