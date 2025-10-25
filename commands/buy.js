const { shop } = require('../config');
const User = require('../models/user');

module.exports = {
  name: 'buy',
  async execute(message, args) {
    const itemName = args.join(' ');
    const item = shop.find(i => i.name.toLowerCase() === itemName.toLowerCase());

    if (!item) return message.reply('<a:Cancel:1387439541266419712> Item not found in the shop.');

    const userId = message.author.id;
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
    }

    if (user.wallet < item.price) {
      return message.reply('<a:warn_q:1387442376137642015> You do not have enough coins.');
    }

    user.wallet -= item.price;
    user.inventory.push(item.name);
    await user.save();

    message.reply(`<a:Check:1387441133856096256> You bought **${item.name}** for ${item.price} coins.`);
  }
};
