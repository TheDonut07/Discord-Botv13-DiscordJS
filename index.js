const express = require("express");
const app = express();
const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const chalk = require("chalk");
const Discord = require("discord.js");
require('dotenv').config();
const { Client, Intents, Collection, Partials } = require("discord.js")



app.listen(3000, () => {
  console.log(chalk.green("[Bot Status]: Bot is running!"));
})

app.get("/", (req, res) => {
  res.send("Hey! I'm live");
});


const client = new Client({ 
  intents: 32767,
  partials: ["CHANNEL"]
});


//Event Handler
require("./Handlers/Events")(client);


//command handler and Prefix
const fs = require("fs");
const prefix = "07!";
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for(file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(commandName, command)
}

//SlashCommand Handler
client.slashcommands = new Discord.Collection();
require("./Handlers/SlashCommands")(client);


//Button Handler
client.buttons = new Discord.Collection();
require("./Handlers/Buttons")(client);



client.on("ready", async () => {
     
    //MongooseDB Connection
  await mongoose.connect(process.env.MONGO_URI, {
    KeepAlive: true,
  }).then(() => {
    console.log(chalk.green("[MongoDB Status]: Connected!"));
  }).catch((err) => {
    console.log(chalk.red(`[MongoDB Status]: Error Detected\n${err}`));
  });
    
  //Birthday Handler
  require("./Handlers/Birthday")(client);

});




//Command Handler Message Part
client.on("message", message => {
  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    //Command Doesn't exist
    const wrongCommandEmbed = new MessageEmbed()
    .setColor("AQUA")
    .setTitle(" :x: **Command doesn't exist!!**")
    
    if(!command) return message.channel.send({embeds: [wrongCommandEmbed] })
    command.run(client, message, args)}

});


client.login(process.env.token);
