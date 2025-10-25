const User = require('../models/user');

module.exports = {
  name: 'blacklistremove',
  async execute(message, args, ADMINS) {
    if (!ADMINS.includes(message.author.id)) {
      return message.reply('<a:Cancel:1387439541266419712> You do not have permission to use this command.');
    }

    const target = args[0];
    if (!target) return message.reply('<a:Cancel:1387439541266419712> Usage: `!blacklistremove @user`');

    const userId = target.replace(/[<@!>]/g, '');
    const user = await User.findOne({ userId });

    if (!user || !user.blacklisted) {
      return message.reply('<a:warn_q:1387442376137642015> That user is not blacklisted.');
    }

    user.blacklisted = false;
    await user.save();

    return message.reply(`<a:Check:1387441133856096256> <@${userId}> has been removed from the blacklist.`);
  }
};
