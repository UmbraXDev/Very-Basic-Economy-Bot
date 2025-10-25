const { EmbedBuilder } = require('discord.js');
const User = require('../models/user');

module.exports = {
  name: 'rank',
  async execute(message) {
    const allUsers = await User.find().sort({ wallet: -1 });
    const userId = message.author.id;
    const user = allUsers.find(u => u.userId === userId);

    if (!user) return message.reply('<a:warn_q:1387442376137642015> You are not on the leaderboard yet.');

    const rank = allUsers.findIndex(u => u.userId === userId) + 1;

    const embed = new EmbedBuilder()
      .setTitle('📊 Your Rank')
      .setColor('#3498db')
      .setDescription(`<a:person:1387446132577144953> <@${userId}>\n\n<a:peepomedalq:1387446222188449884> **Rank:** #${rank}\n\n<a:money_bag:1387438996837105816> **Wallet:** ${user.wallet} coins`)
      .setFooter({ text: 'Ranks change as others earn more!' });

    message.channel.send({
      embeds: [embed],
      allowedMentions: { parse: [] }
    });
  }
};
