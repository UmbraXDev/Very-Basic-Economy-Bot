const User = require('../models/user');

module.exports = {
  name: 'blacklistadd',
  async execute(message, args, ADMINS) {
    if (!ADMINS.includes(message.author.id)) {
      return message.reply('<a:Cancel:1387439541266419712> You do not have permission to use this command.');
    }

    const target = args[0];
    if (!target) return message.reply('<a:Cancel:1387439541266419712> Usage: `!blacklistadd @user`');

    const userId = target.replace(/[<@!>]/g, '');
    if (!userId) return message.reply('<a:Cancel:1387439541266419712> Invalid user mention.');

    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId, wallet: 0, inventory: [], lastDaily: 0, blacklisted: true });
    } else {
      user.blacklisted = true;
    }

    await user.save();
    return message.reply(`<a:Check:1387441133856096256> <@${userId}> has been blacklisted.`);
  }
};
