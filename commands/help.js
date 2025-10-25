const fs = require('fs');

module.exports = {
  name: 'help',
  async execute(message) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    const commandNames = commandFiles.map(file => {
      const cmd = require(`./${file}`);
      return `• \`${cmd.name}\``;
    });

    const helpMessage = `<a:readthis:1387444768119853209> **Available Commands(Prefix: !):**\n\n${commandNames.join('\n')}`;
    message.reply(helpMessage);
  }
};
