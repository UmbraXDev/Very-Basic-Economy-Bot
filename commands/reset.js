const User = require('../models/user');

module.exports = {
  name: 'reset',
  async execute(message, args, ADMINS) {
    if (!ADMINS.includes(message.author.id)) {
      return message.reply('<a:Cancel:1387439541266419712> You don’t have permission to use this command.');
    }

    const target = args[0];

    if (!target) {
      return message.reply('<a:Cancel:1387439541266419712> Usage: `!reset <@user | all>`');
    }

    if (target.toLowerCase() === 'all') {
      await User.updateMany({}, { wallet: 0 });
      return message.reply('<a:bomb:1387446728688402643> All users’ wallet balances have been reset to 0.');
    }

    const userId = target.replace(/[<@!>]/g, ''); // Strip mention formatting
    const user = await User.findOne({ userId });

    if (!user) {
      return message.reply('<a:warn_q:1387442376137642015> User not found in database.');
    }

    user.wallet = 0;
    await user.save();

    message.reply(`<a:troll:1387447045777789038> Reset wallet of <@${userId}> to 0.`);
  }
};
