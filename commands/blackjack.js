const User = require('../models/user');

module.exports = {
  name: 'blackjack',
  async execute(message, args) {
    const bet = parseInt(args[0]);
    if (!bet || bet <= 0) return message.reply('<a:Cancel:1387439541266419712> Usage: `!blackjack <amount>`');

    const userId = message.author.id;
    let user = await User.findOne({ userId });
    if (!user || user.wallet < bet) return message.reply('<a:Cancel:1387439541266419712> You don’t have enough coins.');

    const playerCard = Math.floor(Math.random() * 11) + 10; // 10–20
    const dealerCard = Math.floor(Math.random() * 11) + 10;

    let result = `<a:Pengu_PokerCards:1387440269087084615> You: ${playerCard}\n <a:party_dice:1387440592321249280> Dealer: ${dealerCard}\n`;

    if (playerCard > dealerCard) {
      user.wallet += bet;
      result += `<a:Check:1387441133856096256> You win **${bet} coins**!`;
    } else if (playerCard < dealerCard) {
      user.wallet -= bet;
      result += `<a:pepe_lulq:1387441370603585616> You lose **${bet} coins**.`;
    } else {
      result += `<a:Party_AmongUs:1387441701513203814> It's a tie! No coins lost.`;
    }

    await user.save();
    message.reply(result);
  }
};
