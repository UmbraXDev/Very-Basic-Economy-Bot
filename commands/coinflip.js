const User = require('../models/user');

module.exports = {
  name: 'coinflip',
  async execute(message, args) {
    const bet = parseInt(args[0]);
    const userId = message.author.id;

    if (!bet || isNaN(bet) || bet <= 0) {
      return message.reply('<a:Cancel:1387439541266419712> You must enter a valid amount to bet. Example: `!coinflip 100`');
    }

    let user = await User.findOne({ userId }) || new User({ userId });

    if (user.wallet < bet) {
      return message.reply('<a:Cancel:1387439541266419712> You don’t have enough coins to place that bet!');
    }

    const win = Math.random() < 0.5;

    if (win) {
      user.wallet += bet;
      await user.save();
      return message.reply(`🪙 You flipped **heads** and won **${bet * 2} coins**! <a:02_cheer:1387443255461023854>`);
    } else {
      user.wallet -= bet;
      await user.save();
      return message.reply('🪙 You flipped **tails** and lost your bet. <a:pepe_lulq:1387441370603585616>');
    }
  }
};
