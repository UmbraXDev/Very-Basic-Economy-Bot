const User = require('../models/user');

module.exports = {
  name: 'give',
  async execute(message, args, ADMINS) {
    if (!ADMINS.includes(message.author.id)) {
      return message.reply('<a:Cancel:1387439541266419712> You do not have permission to use this command.');
    }

    const [mention, amount] = args;
    const user = message.mentions.users.first();
    const coins = parseInt(amount);

    if (!user || isNaN(coins)) {
      return message.reply(' <a:Cancel:1387439541266419712> Usage: `!give @user amount`');
    }

    let dbUser = await User.findOne({ userId: user.id });
    if (!dbUser) dbUser = new User({ userId: user.id });

    dbUser.wallet += coins;
    await dbUser.save();

    message.reply(`<a:MoneySoaring:1387439533347573901> Gave **${coins} coins** to ${user.tag}.`);
  }
};
