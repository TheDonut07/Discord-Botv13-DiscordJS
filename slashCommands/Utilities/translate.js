const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const translate = require('translate-google');
const chalk = require("chalk");

module.exports = {
  name: "translate",
  description: "Translate words or sentences from any language to English.",
  options: [
    {
      name: "text",
      description: "Enter the text you want to translate.",
      type: "STRING",
      required: true
    },
  ],

  async execute(interaction) {
    const { client, channel, options, message } = interaction;

    const Text = options.getString("text");

    const Response = new MessageEmbed()
    .setColor("AQUA")
    .setDescription(`**Message:** ${Text}\n **Translation: res `)

    try {
      await interaction.deferReply()
    
      translate(Text, {to : 'en'}).then(res => {
        interaction.editReply({content: `***Text***: ${Text}\n***Translation***: ${res}`});
      }).catch(err => {
        interaction.editReply({content: "An Error while translating!", ephemeral: true});
      });
    
    } catch (error) {
      console.error(chalk.red(`Error Translate Command:`, error));
    }
    
  }

}