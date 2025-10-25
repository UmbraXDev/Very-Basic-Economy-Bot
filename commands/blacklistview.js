const User = require('../models/user');

module.exports = {
  name: 'blacklistview',
  async execute(message, args, ADMINS) {
    if (!ADMINS.includes(message.author.id)) {
      return message.reply('<a:Cancel:1387439541266419712> You do not have permission to use this command.');
    }

    const users = await User.find({ blacklisted: true });

    if (users.length === 0) {
      return message.reply('<a:Party_AmongUs:1387441701513203814> No users are currently blacklisted.');
    }

    // Try to resolve user tags if possible, else fallback to ID
    const list = users.map(u => {
      const member = message.client.users.cache.get(u.userId);
      return member ? `${member.tag} (${u.userId})` : `User ID: ${u.userId}`;
    }).join('\n');

    return message.reply(`<a:warn_q:1387442376137642015> **Blacklisted Users:** <a:warn_q:1387442376137642015>\n\`\`\`\n${list}\n\`\`\``);
  }
};
