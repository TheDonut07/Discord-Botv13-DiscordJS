const { CommandInteraction, MessageEmbed , Client, WebhookClient } = require('discord.js');


module.exports = {
  name: "sendmessage",
  description: "Send message by user specified input to a specific channel through bot",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "message",
      description: "Enter your message.",
      type: "STRING",
      required: true
    },
    {
      name: "channel",
      description: "Enter the channel.",
      type: "CHANNEL",
      required: true
    }
  ],

  async execute(interaction) {
    const { client, channel, options } = interaction;

    const Message = options.getString("message");
    const Channel = options.getChannel("channel");

    const Response = new MessageEmbed()
    .setColor("AQUA")
    .setDescription(`Message was sent! to ${Channel}`)

  
    //Logging System
    guildId = '' //Guild ID
    const logChannel = client.channels.cache.get('');//Log Channel ID for bot messages
    const logMessage = new MessageEmbed()
    .setColor("AQUA")
    .setTitle("Send Message Command")
    .setDescription(` > **Sent to:** ${Channel} \n > **Message:**\n ${Message}`)
    .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, format: 'png' }) })
    .setTimestamp()


    //Webhook System
    const webhooks = await Channel.fetchWebhooks();

    let webhook = webhooks.find(w => w.name === 'BOT' && w.owner.id === client.user.id);

    if(!webhook) {
      webhook = await Channel.createWebhook('BOT', {
        avatar: '', //link of Avatar PNG
        reason: 'Created using SendMessage Command.'
      });
      await interaction.reply({embeds: [Response], ephemeral: true });
        webhook.send({content: `${Message}`});
        if(interaction.guildId === guildId) {
          logChannel.send({embeds: [logMessage]})
        }
    
    } else {
      await interaction.reply({embeds: [Response], ephemeral: true });
        webhook.send({content: `${Message}`});
        if(interaction.guildId === guildId) {
          logChannel.send({embeds: [logMessage]})
        }
    }
    
    
  }
}