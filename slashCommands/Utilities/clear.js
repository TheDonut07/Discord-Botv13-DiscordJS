const { commandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const chalk = require("chalk");


module.exports = {
  name: 'clear',
  description: 'Deletes a specified number of messages from a channel.',
  options: [
    {
      name: "amount",
      description: "Enter the amount of messages you want to delete.",
      type: "NUMBER",
      required: true
    },
    {
      name: "user",
      description: "Select the user to clear their messages.",
      type: "USER",
      required: false
    },
  ],

  async execute(interaction) {
    const { client, message, channel, options } = interaction;

    const Amount = options.getNumber("amount");
    const Target = options.getMember("user");
    const Messages = await channel.messages.fetch();

    //Button, Row and Embed
    const clearCrossBTN = new MessageButton()
    .setStyle("DANGER")
    .setLabel("Exit")
    .setCustomId("Clear-BTN")

    const clearRow = new MessageActionRow()
    .addComponents([clearCrossBTN])

    const Response = new MessageEmbed()
    .setColor("AQUA")


    
    try {

      if(Amount > 100 || Amount <= 0) {
        Response.setDescription(`:x: Amount cannot be exceed 100, and cannot be under 1 !!!`)
        interaction.reply({ embeds: [Response], ephemeral: true });
      }
      //With Target
      else if(Target) {
        let i = 0;
        const filtered = [];
        (await Messages).filter((m) => {
          if(m.author.id === Target.id && Amount > i) {
            filtered.push(m);
            i++;
          }
        })
        

        await interaction.deferReply();
        await channel.bulkDelete(filtered, true).then(messages => {
          Response.setDescription(`:broom: Cleared \`${messages.size}\` messages from ${Target}.`);
          interaction.editReply({ embeds: [Response], components: [clearRow] });
        })

        
      } else {
        //Without Target but filtering bot message for edit Reply
        const botClientID = client.user.id;
        let i = 0;
        const filtered = [];
        (await Messages).filter((m) => {
          if(m.author.id !== botClientID && Amount > i) {
            filtered.push(m);
            i++;
          }
        });
        
        await interaction.deferReply();
        await channel.bulkDelete(filtered, true).then(messages => {
          
          Response.setDescription(`:broom: Cleared \`${messages.size}\` messages from this channel.`);
          interaction.editReply({ embeds: [Response], components: [clearRow] });
        })
      }
    
    } catch(e) {
      console.log(chalk.red(e))
    }


    
  }
}