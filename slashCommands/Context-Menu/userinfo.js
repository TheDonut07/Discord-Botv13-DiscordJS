const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  type: "USER",
  permission: "ADMINISTRATOR",
  async execute(ContextMenuInteraction) {
    const target = await ContextMenuInteraction.guild.members.fetch(ContextMenuInteraction.targetId);

    const Response = new MessageEmbed()
    .setColor("AQUA")
    .setAuthor(target.user.tag, target.user.avatarURL({dynamic: true, size: 512}))
    .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
    .setDescription("**ID**" + `\n > \`${target.user.id}\`\n\n` + `**Roles**\n > ${target.roles.cache.map(r => r).join(" ").replace("@everyone"," ") || "None"}\n`)
    .addField("Member Since", ` > <t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
    .addField("Discord User Since", ` > <t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

    ContextMenuInteraction.reply({embeds: [Response], ephemeral: true})
  }
}