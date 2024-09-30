module.exports.run = (client, message, args) => {
  //Only Speicifed user so add the user id 
  if(message.author.id == "user id add here") {
    message.channel.send("**Shutting down.......**").then(() => {
      process.exit();
    })}
    else {
      message.channel.send("You dont have permission to shutdown me :)")
    }
}

module.exports.name = "shutdown"