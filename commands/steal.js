const User = require('../models/user');

module.exports = {
  name: 'steal',
  async execute(message, args) {
    const target = message.mentions.users.first();
    const thiefId = message.author.id;

    if (!target || target.bot) {
      return message.reply('<a:Cancel:1387439541266419712> You must mention a valid user to steal from!');
    }

    const victimId = target.id;

    if (victimId === thiefId) {
      return message.reply('<a:troll:1387447045777789038> You can’t steal from yourself!');
    }

    let thief = await User.findOne({ userId: thiefId }) || new User({ userId: thiefId });
    let victim = await User.findOne({ userId: victimId }) || new User({ userId: victimId });

    if (victim.wallet < 50) {
      return message.reply('<a:bomb:1387446728688402643> That user doesn’t have enough coins to steal from.');
    }

    const success = Math.random() < 0.5;

    if (success) {
      const stolen = Math.floor(victim.wallet * (Math.random() * 0.25));
      victim.wallet -= stolen;
      thief.wallet += stolen;
      await victim.save();
      await thief.save();
      return message.reply(`<a:peepomedalq:1387446222188449884> You successfully stole **${stolen} coins** from ${target.username}!`);
    } else {
      const fine = Math.min(20, thief.wallet);
      thief.wallet -= fine;
      await thief.save();
      return message.reply(`<a:troll:1387447045777789038> You failed and lost **${fine} coins** as punishment!`);
    }
  }
};
