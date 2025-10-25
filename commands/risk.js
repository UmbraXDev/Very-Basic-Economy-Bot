const User = require('../models/user');

module.exports = {
  name: 'risk',
  async execute(message, args) {
    const bet = parseInt(args[0]);
    if (!bet || isNaN(bet) || bet <= 0) return message.reply('<a:bomb:1387446728688402643> Usage: `!risk <amount>`');

    const user = await User.findOne({ userId: message.author.id }) || new User({ userId: message.author.id });
    if (user.wallet < bet) return message.reply('<a:warn_q:1387442376137642015> You don’t have that many coins.');

    const win = Math.random() < 0.5;
    if (win) {
      const reward = bet * 3;
      user.wallet += reward;
      await user.save();
      return message.reply(`<a:02_cheer:1387443255461023854> You risked and won! Gained **${reward} coins**!`);
    } else {
      user.wallet -= bet;
      await user.save();
      return message.reply(`<a:pepe_lulq:1387441370603585616> You lost it all. Down **${bet} coins**.`);
    }
  }
};
