const User = require('../models/user');

module.exports = {
  name: 'beg',
  async execute(message) {
    const failChance = Math.random() < 0.25;

    if (failChance) return message.reply('<a:Cancel:1387439541266419712> No one gave you any coins. Try again later.');

    const amount = Math.floor(Math.random() * 50) + 1;
    const user = await User.findOneAndUpdate(
      { userId: message.author.id },
      { $inc: { wallet: amount } },
      { upsert: true, new: true }
    );

    message.reply(`<a:MoneySoaring:1387439533347573901> Someone gave you **${amount} coins** out of pity.`);
  }
};
