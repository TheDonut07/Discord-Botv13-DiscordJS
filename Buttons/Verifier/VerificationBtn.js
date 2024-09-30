const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, ButtonInteraction, MessageAttachment } = require("discord.js");
const chalk = require("chalk");
const { Captcha } = require("captcha-canvas");
const CaptchaDB = require("../../models/CaptchaDB");




module.exports = {
  id: "verify-VS",
  
  async execute(interaction) {
    const { client } = interaction;
    
    //Captcha System
    const captcha = new Captcha();
    captcha.async = true;
    captcha.drawTrace();
    captcha.drawCaptcha();

    //CaptchaDB
    const captchaText = captcha.text;
    CaptchaDB.setCaptchaText(captchaText);

    
    const captchaAttachment = new MessageAttachment(
      await captcha.png,
      "captcha.png"
    );



    
    //Logging, etc
    const LogChannel = client.channels.cache.get(process.env['LogChannelID']);
    const LogMessage = new MessageEmbed()
    .setColor("GOLD")
    .setDescription(`**${interaction.user.username}** knocked at the Verification Gate.`)

    
    //Verification Buttons, etc
    const buttonLabels = [captcha.text, generateRandomText(6), generateRandomText(6)];

    shuffleArray(buttonLabels);

    const btn1 = new MessageButton()
    .setLabel(buttonLabels[0])
    .setStyle("PRIMARY")
    .setCustomId("verifybtn-1")
    
    const btn2 = new MessageButton()
    .setLabel(buttonLabels[1])
    .setStyle("PRIMARY")
    .setCustomId("verifybtn-2")
    
    const btn3 = new MessageButton()
    .setLabel(buttonLabels[2])
    .setStyle("PRIMARY")
    .setCustomId("verifybtn-3")


    function generateRandomText(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomText = "";
      for (let i = 0; i < length; i++) {
        randomText += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomText;
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }


    //Action Row
    let VerifyRow1 = new MessageActionRow()
		.addComponents([btn1, btn2, btn3]);





    //Responder
    try {
      interaction.reply({ files: [captchaAttachment], content: `# Verification :shield:\n > Select the button containing the code shown in the image below.`, components: [VerifyRow1], ephemeral: true });

      
      //Alert
      LogChannel.send({ embeds: [LogMessage] });

      console.log(chalk.cyan(`CaptchaTextVariable: ${captchaText}`));
    
    } catch (error) {
      console.error(chalk.red(`Verification System#> ${error}`));
    }

        
  
  },

}