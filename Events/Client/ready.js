const { Client, ActivityType, Events } = require("discord.js");
const chalk = require("chalk");



module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(chalk.green(`[Bot Status]: Logged in as ${client.user.tag}!`));
    console.log(chalk.cyan(`[Bot Status]: Logged in ${client.guilds.cache.size} guilds.`))
    
  
    //Activity Status
    client.user.setActivity("Users", {
      type: "LISTENING",
    });
    
  }
}