const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
  name: "directmessage",
  description: "Send DMs to members through bot.",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "user",
      description: "Select a user to send a DM.",
      type: "USER",
      required: true
    },
    {
      name: "message",
      description: "Enter the message.",
      type: "STRING",
      required: true,
    }
  ],

  async execute(interaction) {
    const {client, channel, options } = interaction;
    const User = options.getMember("user");
    const Message = options.getString("message");

    const Response = new MessageEmbed()
    .setColor("AQUA")
    .setDescription(`${Message}`)
    .setTimestamp()

    //Logging System
    guildId = '' //Main Guild ID
    const logChannel = client.channels.cache.get('');//Log Channel ID for logging bot messages.
    const logMessage = new MessageEmbed()
    .setColor("AQUA")
    .setTitle("DM Command")
    .setDescription(` > **Sent to:** ${User.user.username} (${User})\n > **Message:**\n ${Message}`)
    .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({dynamic: true, format: 'png' }) })
    .setTimestamp()

    const confMessage = new MessageEmbed()
    .setColor("AQUA")
    .setDescription(`**Message was sent to** ${User} ! `)

    User.send({embeds: [Response] });
        await interaction.reply({embeds: [confMessage], ephemeral: true});
        if(interaction.guildId === guildId) {
          logChannel.send({embeds: [logMessage]})
        }

  }
}