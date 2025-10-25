const User = require('../models/user');
const { shop } = require('../config');

module.exports = {
  name: 'sell',
  async execute(message, args) {
    const itemName = args.join(' ').toLowerCase();
    const item = shop.find(i => i.name.toLowerCase() === itemName);

    if (!item) return message.reply('<a:warn_q:1387442376137642015> That item is not sellable.');

    const user = await User.findOne({ userId: message.author.id }) || new User({ userId: message.author.id });
    const index = user.inventory.indexOf(item.name);

    if (index === -1) return message.reply('<a:Cancel:1387439541266419712> You do not have that item.');

    user.wallet += Math.floor(item.price / 2);
    user.inventory.splice(index, 1);
    await user.save();

    message.reply(`<a:Check:1387441133856096256> You sold **${item.name}** for **${Math.floor(item.price / 2)} coins**!`);
  }
};
