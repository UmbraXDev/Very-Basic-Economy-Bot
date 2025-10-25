require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const config = require('./config');
const ADMINS = process.env.ADMINS ? process.env.ADMINS.split(',') : [];

const User = require('./models/user'); // Required for blacklist checks

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const commands = new Map();
const cooldowns = new Map(); // userId -> Map(commandName -> timestamp)

// Load all commands
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  client.user.setPresence({
    activities: [{ name: 'the economy grow 💰', type: ActivityType.Watching }],
    status: 'online'
  });

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('📦 Connected to MongoDB'));
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = commands.get(commandName);
  if (!command) return;

  const userId = message.author.id;

  // 🚫 Blacklist check
  let user = await User.findOne({ userId });
  if (user?.blacklisted) {
    return message.reply('⛔ You are blacklisted from using the bot.');
  }

  // ✅ Optional: Create user if not found
  if (!user) {
    user = new User({ userId, wallet: 0, inventory: [], lastDaily: 0 });
    await user.save();
  }

  // ⏱️ 5s cooldown for all except 'daily'
  if (commandName !== 'daily') {
    const now = Date.now();
    const cooldownAmount = 5 * 1000;

    if (!cooldowns.has(userId)) {
      cooldowns.set(userId, new Map());
    }

    const timestamps = cooldowns.get(userId);
    const lastUsed = timestamps.get(commandName) || 0;

    if (now - lastUsed < cooldownAmount) {
      const remaining = Math.ceil((cooldownAmount - (now - lastUsed)) / 1000);
      return message.reply(`⏱️ Please wait ${remaining}s before using \`${config.prefix}${commandName}\` again.`);
    }

    timestamps.set(commandName, now);
  }

  try {
    await command.execute(message, args, ADMINS);
  } catch (error) {
    console.error(error);
    message.reply('⚠️ There was an error trying to execute that command.');
  }
});

client.login(process.env.DISCORD_TOKEN);
