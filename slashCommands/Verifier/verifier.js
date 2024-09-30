const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const chalk = require("chalk");
const { Captcha } = require("captcha-canvas");




module.exports = {
  name: "verifier",
  description: "Part of Verification System.",

  async execute(interaction) {


    //Button and Row
    let verifyBTN = new MessageButton()
		.setStyle("SUCCESS")
		.setCustomId("verify-VS")
    .setLabel("Verification")


    let VerifyRow1 = new MessageActionRow()
		.addComponents([verifyBTN])


    //Response
    const Response = new MessageEmbed()
    .setColor('AQUA')
    .setDescription(`# The Verification Gate` + `\n- To enter this Gate, you have to Verify yourself.\n- Please click the button below and complete the Verification process. \n\n*The Server Verification Gate is protected by 07 Verifier.*`)
    .setImage("") //Add you Banner Image link for Aestieiccs or however that is spelled.
    .setTimestamp()

    


    interaction.reply({ content: `**Verification System is Live!**`, ephemeral: true });
      await interaction.channel.send({ embeds: [Response], components: [VerifyRow1] });



    


    
  },

};