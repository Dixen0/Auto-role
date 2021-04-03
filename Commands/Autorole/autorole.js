const Discord = require('discord.js')
const { prefix, Color } = require('../../config.js')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {


 if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You don't have permission to do this command`)

    
let cmd = args[0];

if(!cmd){

return message.channel.send(new Discord.MessageEmbed().addField(Color).addField(`Autorole Command Usage:`, `${prefix}autorole\n${prefix}autorole add @Role\n${prefix}autorole remove\n${prefix}autorole list`))
   }

  if(cmd.toLowerCase() === 'add') {

  let role = message.mentions.roles.first()
   if(!role) return message.channel.send(`🙄 | Pleas mention a role`)

  
    if(role.position >= message.guild.me.roles.highest.position) return

   await db.set(`autorole_${message.guild.id}`, role.id)

  return message.channel.send(`Success added ${role} to AutoRole`)

}


  if(cmd.toLowerCase() === 'remove') {

  await db.delete(`autorole_${message.guild.id}`)
  return message.channel.send(`Success remove a role`)

}

if(cmd.toLowerCase() === 'list') {

  let role = await db.get(`autorole_${message.guild.id}`)

  if(role === null) return message.channel.send(new Discord.MessageEmbed().setAuthor(client.user.username, client.user.avatarURL({dynamic: true})).addField(`AutoRole List:`, `Not found`).setFooter(message.author.tag, message.author.avatarURL({dynamic: true})))

  return message.channel.send(new Discord.MessageEmbed().setAuthor(client.user.username, client.user.avatarURL({dynamic: true})).addField(`AutoRole List:`, `<@&${role}>`).setFooter(message.author.tag, message.author.avatarURL({dynamic: true})))

}



};

module.exports.help = {
    name: "autorole",
    aliases: [],
    cooldown: 1,
    category: "Autorole",
    description: "Set autorole,
    usage: "autorole add @role",
    examples: ["autorole add @Member"]
};
