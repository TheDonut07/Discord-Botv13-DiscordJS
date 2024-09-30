const { commandInteraction, MessageEmbed, MessageAttachment } = require('discord.js');
const chalk = require("chalk");
const petPetGif = require('pet-pet-gif');

module.exports = {
  name: 'pet',
  description: 'I will pet your friend.',
  options: [
    {
      name: "user",
      description: "Select the user, you want to pet.",
      type: "USER",
      required: true
    },
  ],

  async execute(interaction) {
    const { client, message, channel, options } = interaction;

    const PetUser = options.getUser("user");
    const UserAvatar = PetUser.avatarURL({ dynamic: true, format: 'png' });


    try {

      await interaction.deferReply();
      
      const animatedGif = await petPetGif(UserAvatar);
      const UserGIFAttachment = new MessageAttachment(animatedGif, 'petting.gif');
      
      interaction.editReply({ files: [UserGIFAttachment] });
    
    } catch (error) {
      console.error(chalk.red('Pet Error:', error));
    }
  }
};