const User = require('../models/user');

module.exports = {
  name: 'work',
  async execute(message) {
    const jobs = ['programmer', 'farmer', 'chef', 'waiter', 'driver', 'thief'];
    const earnings = Math.floor(Math.random() * 200) + 100;
    const job = jobs[Math.floor(Math.random() * jobs.length)];

    const user = await User.findOneAndUpdate(
      { userId: message.author.id },
      { $inc: { wallet: earnings } },
      { upsert: true, new: true }
    );

    message.reply(`<a:tiredaf:1387450012597751929> You worked as a **${job}** and earned **${earnings} coins**!`);
  }
};
