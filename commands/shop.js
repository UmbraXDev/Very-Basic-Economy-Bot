const { shop } = require('../config');

module.exports = {
  name: 'shop',
  execute(message) {
    let shopList = shop
      .map((item, i) => `\`${i + 1}.\` **${item.name}** - ${item.price} coins\n> ${item.description}`)
      .join('\n');

    message.channel.send(`<a:shopping_cat:1387448854554611814> **Shop Items:**\n\n${shopList}`);
  }
};
