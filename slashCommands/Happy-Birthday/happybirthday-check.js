const { CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require("../../models/birthday");

module.exports = {
  name: "happybirthday-check",
  description: "Check your birthday details.",
  options: [
    {
      name: "user",
      description: "Select the user.",
      type: "USER",
      required: true
    }
  ],

  async execute(interaction) {
    const { channel, options } = interaction;

    const Member = options.getMember("user");
    
    const Response = new MessageEmbed()
    .setColor("AQUA");

    
    Schema.findOne({ Guild: interaction.guild.id, User: Member.user.id }, async (err, data) => {
      if(!data) {
        Response.setDescription(`${Member} haven't set the birthday yet!`)
          return interaction.reply({embeds: [Response] })
      }
      
      Response.setDescription(`${Member} birthday is on **${data.Birthday}** `)
        return interaction.reply({embeds: [Response] })
      
    })
  }
  
}