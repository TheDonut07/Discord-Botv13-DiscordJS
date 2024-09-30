const Discord = require("discord.js");
const Schema = require("../models/birthday");
const chalk = require("chalk");
const schedule = require('node-schedule');
const { MessageEmbed } = require("discord.js");



module.exports = async (client) => {
  const Guilds = client.guilds.cache
  //Scheduled Time (UTC Timezone)
  const rule = new schedule.RecurrenceRule();
  rule.hour = 10;
  rule.minute = 50;
  rule.tz = 'Etc/UTC' //Change it according to your Timezone or go to "https://www.npmjs.com/package/node-schedule" for more details.
  const BirthdayTime = schedule.scheduleJob(rule, () => {
    Guilds.forEach(async (g) => {
      const Data = await Schema.find({ Guild: g.id }).catch(err => { })
      if(!Data) return

      Data.forEach((data) => {
        const Channel = client.channels.cache.get(''); //Birthday wishing Channel ID
        const Member = data.User || "Unknown User #0000";
        const Day = data.Day;
        const Month = data.Month;

        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();

        const hbEmbed = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`*It's* <@${Member}> *Birthday*, ***Happy Birthday!!*** `)
        

        if(Month == currentMonth && Day == currentDay) {
          Channel.send({ 
            content: `@here`,
            embeds: [hbEmbed] })
          console.log(chalk.cyan(`[Birthday Event]: Wishing Happy Birthday @ ${currentDay}-${currentMonth}-${currentYear}`));

        }

      })
    })
  })
  console.log(chalk.cyan(`[Birthday Wish]: ${rule.hour}:${rule.minute} UTC`));
}