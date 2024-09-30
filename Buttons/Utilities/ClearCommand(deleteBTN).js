const { Client, CommandInteraction, MessageEmbed, MessageActionRow, ButtonInteraction, MessageAttachment } = require("discord.js");
const chalk = require("chalk");


module.exports = {
  id: "Clear-BTN",
  
  async execute(interaction) {
    try {
      //Delete the interaction message
      await interaction.message.delete();
    
    } catch (error) {
      console.error(chalk.red(`Failed to delete the message:`, error));
    }
  }
  
}