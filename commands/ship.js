module.exports = {
  name: 'ship',
  execute(message, args) {
    if (args.length < 2) return message.reply('<a:warn_q:1387442376137642015> Usage: `!ship @user1 @user2`');

    const user1 = args[0];
    const user2 = args[1];
    const percent = Math.floor(Math.random() * 101);

    const barLength = 20;
    const filled = Math.floor((percent / 100) * barLength);
    const bar = '💖'.repeat(filled) + '💔'.repeat(barLength - filled);

    message.reply(`<a:02_cheer:1387443255461023854> Shipping **${user1}** and **${user2}**:\n\n<a:hearting:1387448026850787568> Love Meter: **${percent}%**\n\`${bar}\``);
  }
};
