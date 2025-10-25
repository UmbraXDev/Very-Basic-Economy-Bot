const User = require('../models/user');

module.exports = {
  name: 'dicebet',
  async execute(message, args) {
    const bet = parseInt(args[0]);
    if (!bet || isNaN(bet) || bet <= 0) return message.reply('<a:warn_q:1387442376137642015> Usage: `!dicebet <amount>`');

    const user = await User.findOne({ userId: message.author.id }) || new User({ userId: message.author.id });
    if (user.wallet < bet) return message.reply('<a:Cancel:1387439541266419712> Not enough coins.');

    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll > 3) {
      user.wallet += bet;
      await user.save();
      return message.reply(`<a:party_dice:1387440592321249280> You rolled a **${roll}** and **won ${bet} coins!**`);
    } else {
      user.wallet -= bet;
      await user.save();
      return message.reply(`<a:party_dice:1387440592321249280> You rolled a **${roll}** and **lost ${bet} coins.**`);
    }
  }
};
