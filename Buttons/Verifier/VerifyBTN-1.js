const { Client, CommandInteraction, MessageEmbed, MessageActionRow, ButtonInteraction, MessageAttachment } = require("discord.js");
const chalk = require("chalk");
const CaptchaDB = require("../../models/CaptchaDB");


module.exports = {
  id: "verifybtn-1",

  async execute(interaction) {

    const { client } = interaction;

    //Verified Role
    const VerifiedroleID = CaptchaDB.getCaptchaVerifiedRole();
    const Verifiedrole = interaction.guild.roles.cache.get(VerifiedroleID);

    //Unverified Role
    const UnverifiedroleID = CaptchaDB.getCaptchaUnverifiedRole();
    const Unverifiedrole = interaction.guild.roles.cache.get(UnverifiedroleID);

    //Captcha Text Function
    const captchaText = CaptchaDB.getCaptchaText();

    //Response Images
    const VerifiedImage = CaptchaDB.getVerifiedPassBanner();
    const FailedtoVerifyImage = CaptchaDB.getVerifiedFailBanner();

    //Logging, etc
    const LogChannel = client.channels.cache.get(process.env['LogChannelID']);
    //Success
    const LogSuccess = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**${interaction.user.username}** successfully entered the Gate.`)
    //Failure
    const LogFailure = new MessageEmbed()
    .setColor("RED")
    .setDescription(`**${interaction.user.username}** failed to enter the Gate.`)



    try {
      if(interaction.component.label === captchaText) {
        //Adding User Role
        interaction.member.roles.add(Verifiedrole)

        //Removing Unverified Role
        interaction.member.roles.remove(Unverifiedrole)
        
        await interaction.update({
          content: "_ _",
          components: [],
          files: [VerifiedImage],
          ephemeral: true
        });
        //Alert
        LogChannel.send({ embeds: [LogSuccess] });
    
      } else {
        await interaction.update({
          content: "_ _",
          components: [],
          files: [FailedtoVerifyImage],
          ephemeral: true
        });
        //Alert
        LogChannel.send({ embeds: [LogFailure] });
      }
      
    } catch (error) {
      console.error(chalk.red(`Verification System#> ${error}`));
    }
      
  },
};