const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const chalk = require("chalk");
const usetube = require('usetube');

module.exports = {
  name: "youtube",
  description: "search YouTube video using keywords.",
  options: [
    {
      name: "search",
      description: "title of the yt video.",
      type: "STRING",
      required: true
    },
  ],

  async execute(interaction) {
    const { client, channel, options, message } = interaction;
    const searchQuery = options.getString("search");

    const ErrorEmbed = new MessageEmbed()
    .setColor('RED')
    .setDescription(`The video you want me to search, can't be found. Make sure to give me valid title name or keywords of that Yt video please!`)

    try {
      console.log(chalk.yellow(`Yt search query started:`));
      
      const videoResults = await usetube.searchVideo(searchQuery);

      //Get the first result
      const firstVideo = videoResults.videos[0];

      const videoTitle = firstVideo.title;
      const videoURL = `https://www.youtube.com/watch?v=${firstVideo.id}`;

      await interaction.deferReply()
      await interaction.editReply(`${videoURL}`);

      console.log(chalk.yellow(`Yt search query ended!`));
    
    } catch (error) {
      interaction.reply({ embeds: [ErrorEmbed], ephemeral: true });
      console.error(chalk.red(`Error searching YouTube:`, error));
    }


    
  },
  
};