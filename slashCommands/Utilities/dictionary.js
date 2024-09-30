const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const urban = require('relevant-urban');
const chalk = require("chalk");


module.exports = {
  name: "dictionary",
  description: "Gives definition and example of the term you search for.",
  options: [
    {
      name: "search",
      description: "Enter the term to search for",
      type: "STRING",
      required: true
    },
  ],

  async execute(interaction) {
    const { client, channel, options, message } = interaction;

    const Text = options.getString("search");




    try {

      await interaction.deferReply();

      urban(Text)
      .then(results=>{

        //Response Embed
        const Response = new MessageEmbed()
        .setDescription(`# ${results.word}\n### - Definition:\n${results.definition}\n\n### - Example:\n${results.example}`)
        .setColor("AQUA")


        interaction.editReply({ embeds: [Response] });
        console.log(results)
      })
      .catch(error=>{
        //Not Found Word Embed
        const NotFound = new MessageEmbed()
        .setColor("RED")
        .setDescription(`# “*Can't find the word you searched for...*”`)


        interaction.editReply({ embeds: [NotFound] });
        console.log(chalk.red(`Dictionary Error Handling:`, error))
      })




    } catch(err) {
      interaction.reply({ content: "An Error Occured! Try Again please...", ephemeral: true });
      console.log(chalk.red(`Dictionary Error Handling:`, err))
    }




  }

}