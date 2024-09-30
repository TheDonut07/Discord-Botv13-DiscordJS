const { MessageEmbed, Client, MessageAttachment } = require('discord.js');
const chalk = require("chalk");



module.exports = async (client) => {

  setInterval(() => {
    checkAndDeleteInvites();
  }, 20 * 60 * 1000); // Check every 20 minutes


  async function checkAndDeleteInvites() {
    try {
      // Fetch the Main Server
      const guild = await client.guilds.fetch(); //GUILD ID

      // Fetch the Invites from Main Server
      const invites = await guild.invites.fetch();

      //Logging 
      const LogChannel = client.channels.cache.get(process.env['LogChannelID']);

      // Looping through each invite
      invites.forEach(async (invite) => {

        // Check if the invite has an expiration set to infinity
        if(!invite.expiresAt) {

          //Checking if the invite is older than 3 days
          const daysOld = (Date.now() - invite.createdTimestamp) / (1000 * 60 * 60 * 24);
          const daysThresold = 3;

          if (daysOld >= daysThresold) {
            // Delete the invite
            await invite.delete();

            //Logging 
            const LogInviteDelMessage = new MessageEmbed()
            .setColor("GOLD")
            .setDescription(` - Deleted invite **${invite.code}** because it was created ${daysOld} Days ago by **${invite.inviter.username}**.`)
            LogChannel.send({ embeds: [LogInviteDelMessage] });

            console.log(chalk.yellow(`Deleted Invite ${invite.code} because it was created ${daysOld} days ago by ${invite.inviter.username}.`));
            
          }

        }

      });

    } catch (error) {
      console.error(chalk.red(`Invite Manager Handler Error:`, error));
    }
  }
  console.log(chalk.cyan(`[Invite Manager]: Alive`));
}