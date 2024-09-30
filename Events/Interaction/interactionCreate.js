const { Client, CommandInteraction, ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if(interaction.isCommand() || interaction.isContextMenu()) {
      const command = client.slashcommands.get(interaction.commandName);
      if(!command) return interaction.reply({embeds: [
        new MessageEmbed()
        .setColor("RED")
        .setDescription("🚫 An error occured while running this command.")
      ]}) && client.slashcommands.delete(interaction.commandName);

      command.execute(interaction, client)

      
    }
  }
}