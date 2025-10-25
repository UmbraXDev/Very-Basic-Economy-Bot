const User = require('../models/user');

module.exports = {
  name: 'balance',
  async execute(message) {
    const userId = message.author.id;
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
      await user.save();
    }

    message.reply(`<a:money_bag:1387438996837105816> You have ${user.wallet} coins.`);
  }
};
