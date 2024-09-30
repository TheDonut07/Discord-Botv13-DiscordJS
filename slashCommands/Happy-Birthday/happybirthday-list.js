const { CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require("../../models/birthday");

module.exports = {
  name: "happybirthday-list",
  description: "Shows birthdays list of specified month.",
  options: [
    {
      name: "month",
      description: "Type the number of a month.",
      type: "NUMBER",
      required: true
    }
  ],

  async execute(interaction) {
    const { channel, options } = interaction;

    const Month = options.getNumber("month");
    
    const Response = new MessageEmbed()
    .setColor("AQUA");

    const months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    
    if(Month > 12 || Month <= 0) {
      Response.setDescription("Wrong Month! *Month cannot be 0 or more than 12* ")
        return interaction.reply({embeds: [Response], ephemeral: true})
    }

    const convertedMonth = months[Month];

    Schema.find({ Month: Month, Guild: interaction.guild.id }, async (err, data) => {
      
      let index = 1
      
      if(!data || data.length === 0) {
        Response.setDescription(`*There are no birthdays in the month of **${convertedMonth}*** `)
          return interaction.reply({ embeds: [Response] })
      }

      await interaction.deferReply()

      const date = new Date()

      data.sort((a, b) => new Date(`${a.Month} ${a.Day}`) - new Date(`${b.Month} ${b.Day}`))
      
      const BirthdayData = data.map((d) => {
        return ` > **${index++}.** \`${d.Birthday}\` - <@${d.User}>`
      }).join("\n")
      
      const List = new MessageEmbed()
      .setColor("AQUA")
      .setDescription(`# Birthday List of ${convertedMonth} \n${BirthdayData}`)
      .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({dynamic: true, format: 'png' }) })
      .setTimestamp()

      return interaction.editReply({ embeds: [List] })
  
    })
  
  }
}