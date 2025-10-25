const User = require('../models/user');

const fishTypes = [
  { rarity: 'Common', chance: 50, min: 10, max: 20 },
  { rarity: 'Uncommon', chance: 25, min: 50, max: 100 },
  { rarity: 'Rare', chance: 15, min: 150, max: 300 },
  { rarity: 'Epic', chance: 8, min: 500, max: 800 },
  { rarity: 'Legendary', chance: 2, min: 1000, max: 2000 }
];

function pickFish() {
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (const fish of fishTypes) {
    cumulative += fish.chance;
    if (roll <= cumulative) {
      return fish;
    }
  }
  return null;
}

module.exports = {
  name: 'fish',
  async execute(message) {
    const userId = message.author.id;

    // 25% chance to fail
    const failChance = Math.random();
    if (failChance < 0.25) {
      return message.reply('<a:fish:1387443953565175818> You went fishing but caught **nothing**...');
    }

    const fish = pickFish();
    const reward = Math.floor(Math.random() * (fish.max - fish.min + 1)) + fish.min;

    let user = await User.findOne({ userId });
    if (!user) user = new User({ userId });

    user.wallet += reward;
    user.inventory.push(`${fish.rarity} Fish`);
    await user.save();

    message.reply(`<a:pogfish:1387443866348814397> You caught a **${fish.rarity} Fish** and received **${reward} coins**!`);
  }
};
