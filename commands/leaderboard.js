const { EmbedBuilder } = require('discord.js');
const User = require('../models/user');

module.exports = {
  name: 'leaderboard',
  async execute(message) {
    const topUsers = await User.find().sort({ wallet: -1 }).limit(10);

    if (topUsers.length === 0) {
      return message.reply('<a:Cancel:1387439541266419712> No users on the leaderboard yet.');
    }

    const leaderboard = topUsers
      .map((user, index) => `**${index + 1}.** <@${user.userId}> — \`${user.wallet} coins\``)
      .join('\n');

    const embed = new EmbedBuilder()
      .setTitle('<a:graph:1387445776455565312> Top 10 Richest Users')
      .setColor('#00FF99')
      .setDescription(leaderboard)
      .setFooter({ text: 'Use your coins wisely...' });

    message.channel.send({
      embeds: [embed],
      allowedMentions: { parse: [] } // don't ping
    });
  }
};
