const User = require('../models/user');

module.exports = {
  name: 'slots',
  async execute(message, args) {
    const bet = parseInt(args[0]);
    if (!bet || isNaN(bet) || bet <= 0) return message.reply('<a:Cancel:1387439541266419712> Usage: `!slots <amount>`');

    const user = await User.findOne({ userId: message.author.id }) || new User({ userId: message.author.id });

    if (user.wallet < bet) return message.reply('<a:warn_q:1387442376137642015> You don’t have enough coins.');

    const symbols = ['🍒', '🍋', '💎', '🔔', '🍀'];
    const spin = [symbols.random(), symbols.random(), symbols.random()];

    function count(arr, sym) {
      return arr.filter(x => x === sym).length;
    }

    const jackpot = count(spin, spin[0]) === 3;
    const twoMatch = new Set(spin).size === 2;

    let winnings = 0;
    if (jackpot) winnings = bet * 5;
    else if (twoMatch) winnings = bet * 2;
    else winnings = -bet;

    user.wallet += winnings;
    await user.save();

    const result = spin.join(' ');
    const response = winnings > 0
      ? `<a:02_cheer:1387443255461023854> ${result} — You won **${winnings} coins!**`
      : `<a:pepe_lulq:1387441370603585616> ${result} — You lost **${bet} coins!**`;

    message.reply(response);
  }
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
