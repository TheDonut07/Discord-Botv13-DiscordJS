const { CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require("../../models/birthday");

module.exports = {
  name: "happybirthday-set",
  description: "Set your Birthday reminder for everyone!",
  options: [
    {
      name: "day",
      description: "Give your day of birth.",
      type: "NUMBER",
      required: true
    },
    {
      name: "month",
      description: "Give your month of birth.",
      type: "NUMBER",
      required: true
    }
  ],

  async execute(interaction) {
    const { channel, options } = interaction;
    const Day = options.getNumber("day");
    const Month = options.getNumber("month");

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

    const Response = new MessageEmbed()
    .setColor("AQUA");

    if(Day > 31 || Day <= 0) {
      Response.setDescription(`Wrong day format! `)
        return interaction.reply({embeds: [Response], ephemeral: true})
    }
    if(Month > 12 || Month <= 0) {
      Response.setDescription(`Wrong month format! `)
        return interaction.reply({embeds: [Response], ephemeral: true})
    }

    const convertedDay = suffixes(Day);
    const convertedMonth = months[Month];
    const birthdayDay = Day;
    const birthdayMonth = Month;
    const birthdayString = `${convertedDay} of ${convertedMonth}`

    Schema.findOne({ User: interaction.user.id, Guild: interaction.guild.id }, async(err, data) => {
      if(data) {
        data.Day = birthdayDay;
        data.Month = birthdayMonth;
        data.Birthday = birthdayString;
        data.save();
      } else {
        new Schema({
          Guild: interaction.guild.id,
          User: interaction.user.id,
          Day: Day,
          Month: Month,
          Birthday: birthdayString,
        }).save();
      }
    });

    Response.setDescription("<@" + interaction.user.id + "> birthday noted! " + `***${birthdayString}*** `)
    interaction.reply({embeds: [Response] });
    

    
  }
}

function suffixes(number) {
  const converted = number.toString();
  const lastChar = converted.charAt(converted.length - 1);

  return lastChar == "1" 
    ? `${converted}st` 
    : lastChar == "2"
    ? `${converted}nd` 
    : lastChar == "3"
    ? `${converted}rd`
    : `${converted}th`;
}
