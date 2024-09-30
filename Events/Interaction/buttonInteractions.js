const { ButtonInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    
    if(!interaction.isButton()) return;
    const Button = client.buttons.get(interaction.customId);

    if(!Button) return;

    Button.execute(interaction, client)
  }
}