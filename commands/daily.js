const User = require('../models/user');

module.exports = {
  name: 'daily',
  async execute(message) {
    const userId = message.author.id;
    const now = Date.now();
    const timeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Fetch user from database or create if not found
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId, wallet: 0, inventory: [], lastDaily: 0 });
    }

    const lastClaim = user.lastDaily || 0;

    if (now - lastClaim < timeout) {
      const timeLeft = timeout - (now - lastClaim);
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      return message.reply(
        `<a:time:1387443435299934320> You already claimed your daily!\nCome back in **${hours}h ${minutes}m ${seconds}s**.`
      );
    }

    const reward = Math.floor(Math.random() * 151) + 100; // 100–250 coins
    user.wallet += reward;
    user.lastDaily = now;
    await user.save();

    message.reply(`<a:02_cheer:1387443255461023854> You claimed your daily reward of **${reward} coins**!`);
  }
};
