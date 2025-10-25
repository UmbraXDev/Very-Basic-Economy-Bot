const User = require('../models/user');

module.exports = {
  name: 'roulette',
  async execute(message, args) {
    const bet = parseInt(args[1]);
    const choice = args[0]?.toLowerCase();

    if (!['red', 'black'].includes(choice) || !bet || bet <= 0)
      return message.reply('<a:warn_q:1387442376137642015> Usage: `!roulette <red|black> <amount>`');

    const userId = message.author.id;
    let user = await User.findOne({ userId });
    if (!user || user.wallet < bet) return message.reply('<a:warn_q:1387442376137642015> You don’t have enough coins.');

    const outcome = Math.random() < 0.5 ? 'red' : 'black';
    let result = `<a:party_dice:1387440592321249280> You chose **${choice}**. It landed on **${outcome}**.\n`;

    if (choice === outcome) {
      user.wallet += bet;
      result += `<a:Check:1387441133856096256> You won **${bet} coins**!`;
    } else {
      user.wallet -= bet;
      result += `<a:Party_AmongUs:1387441701513203814> You lost **${bet} coins**.`;
    }

    await user.save();
    message.reply(result);
  }
};
