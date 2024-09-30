const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const chalk = require("chalk");

module.exports = {
  name: "suggest",
  description: "To suggest new things for the server.",
  //type: 2, //SUB_COMMAND_GROUP
  options: [
    {
      name: "something",
      description: "To suggest something for the server.",
      type: 1, //SUB_COMMAND_GROUP
      options: [
        {
          name: "message",
          description: "Enter your message for others.",
          type: "STRING",
          required: true
        },
      ],
    },
    {
      name: "emoji",
      description: "To suggest new emoji's for the server.",
      type: 1, //SUB_COMMAND_GROUP
      options: [
        {
          name: "message",
          description: "Enter your message for others.",
          type: "STRING",
          required: true
        },
        {
          name: "file",
          description: "Attach your file for emoji submission.",
          type: "ATTACHMENT",
          required: true
        },
      ],
    },
    {
      name: "sticker",
      description: "To suggest new sticker's for the server.",
      type: 1, //SUB_COMMAND_GROUP
      options: [
        {
          name: "message",
          description: "Enter your message for others.",
          type: "STRING",
          required: true
        },
        {
          name: "file",
          description: "Attach your file for emoji submission.",
          type: "ATTACHMENT",
          required: true,
        },
      ],
    },
  ],
  
  async execute(interaction) {

    const { client, channel, options, message } = interaction;

    const SubCommandName = options.getSubcommand();
    const Message = options.getString("message");
    const File = options.getAttachment("file");

    const User = await interaction.guild.members.fetch(interaction.user.id);

    //Response Embed
    const Response = new MessageEmbed()
    .setColor("AQUA")
    .setDescription(` > ${Message}\n\n ** - ${interaction.user.username}** (${User.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"})\n`)
    .setFooter("Suggestion Opened")
    .setTimestamp()

    //Error Embed
    const ErrorResponse = new MessageEmbed()
    .setColor("RED")
    .setDescription(`Error \`404\`, *please try again later!*`)
    


    //Sub Command Manager
    if(SubCommandName === "something") {
      Response.setTitle("New Suggestion")


      interaction.reply({embeds: [Response]}).then(() => {
        
        interaction.channel.messages.fetch({ limit: 1 }).then(message => {
          const fetchedMsg = message.first();
          fetchedMsg.react("<a:cat_Yes:1067824014527041548>"); //Change with your emoji id for upvote
          fetchedMsg.react("<a:cat_No:1067823998194417744>"); //Change with your emoji id for downvote
        });
        
      }).catch(error => {
        console.error('Error:', error);
      });
      
      
    } else if(SubCommandName === "emoji") {
      Response.setTitle("New Emoji Suggestion")
      
      await interaction.deferReply();
      await interaction.editReply({ files: [File] }).then(() => {
        
        interaction.channel.send({embeds: [Response]}).then(messageChannel => {
          messageChannel.react("<a:cat_Yes:1067824014527041548>"); //Change with your emoji id for upvote
          messageChannel.react("<a:cat_No:1067823998194417744>"); //Change with your emoji id for downvote
          
        }).catch(error => {
          console.error('Error:', error);
        });
      }).catch((error) => {
        console.error('Error:', error);
        
        interaction.channel.send({ embeds: [ErrorResponse] }).then(msg => {
          setTimeout(() => msg.delete(), 10000); //10s
        });
        
      });

      
      
    } else if(SubCommandName === "sticker") {
      Response.setTitle("New Sticker Suggestion")
      
      await interaction.deferReply();
      await interaction.editReply({ files: [File] }).then(() => {
        
        interaction.channel.send({embeds: [Response]}).then(messageChannel => {
          messageChannel.react("<a:cat_Yes:1067824014527041548>"); //Change with your emoji id for upvote
          messageChannel.react("<a:cat_No:1067823998194417744>"); //Change with your emoji id for downvote
          
        }).catch(error => {
          console.error('Error:', error);
        });
      }).catch((error) => {
        console.error('Error:', error);
        
        interaction.channel.send({ embeds: [ErrorResponse] }).then(msg => {
          setTimeout(() => msg.delete(), 10000); //10s
        });
        
      });

      
    }
    
  }


}