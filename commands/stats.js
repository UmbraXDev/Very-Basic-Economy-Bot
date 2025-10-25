const User = require('../models/user');

module.exports = {
  name: 'stats',
  async execute(message) {
    const user = await User.findOne({ userId: message.author.id }) || new User({ userId: message.author.id });
    const inventory = user.inventory.length ? user.inventory.join(', ') : 'Empty';

    message.reply(`<a:graph:1387445776455565312> **Your Stats**:
<a:money_bag:1387438996837105816> Wallet: ${user.wallet} coins
<a:bag:1387445049670897735> Inventory: ${inventory}`);
  }
};
