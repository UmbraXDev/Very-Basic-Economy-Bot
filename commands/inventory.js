const User = require('../models/user');

module.exports = {
  name: 'inventory',
  async execute(message) {
    const userId = message.author.id;
    const user = await User.findOne({ userId });

    if (!user || user.inventory.length === 0) {
      return message.reply('<a:pepe_lulq:1387441370603585616> Your inventory is empty.');
    }

    const itemCounts = user.inventory.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    const itemList = Object.entries(itemCounts)
      .map(([item, count]) => `• ${item} x${count}`)
      .join('\n');

    message.reply(`<a:bag:1387445049670897735> **Your Inventory:**\n${itemList}`);
  }
};
