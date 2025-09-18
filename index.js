/** @format */

import {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
  REST,
} from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Define the commands
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .toJSON(), // Convert the command to JSON for registration
];

// Register slash commands and start the bot
client.on('ready', async () => {
  console.log(`The bot is ready! Logged in as ${client.user.tag}`);

  try {
    // Register the slash commands for a specific guild
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, '1332868631155048518'), // Use applicationGuildCommands here
      {
        body: commands,
      }
    );
    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
});

// Handle slash command interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// Handle regular text-based commands
client.on('messageCreate', async (message) => {
  if (message.content === 'ping') {
    await message.reply({
      content: 'pong',
    });
  }
});

client.on('messageCreate', async (message) => {
  if (message.content === 'hi') {
    await message.reply({
      content: 'hello there!',
    });
  }
});

client.on('messageCreate', async (message) => {
// Ignore messages from bots
  if (message.author.bot) return;

  if (message.content === 'flip') {
    const flipResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
    await message.reply({
      content: `The coin landed on: ${flipResult}!`,
    });
  }
});

// Log in to Discord
client.login(process.env.TOKEN);
