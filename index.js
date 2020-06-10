const fetch = require("node-fetch")
const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const bot = new Discord.Client()

const token = 'NzIwMTIyMTA2NTM2Mzk0ODU1.XuBbgQ.H2RNzT-6fQw2a_pi0yGlYlyOcVc'

const PREFIX = '!'

bot.on('ready', () => {
    console.log('Bot ready!')
})

bot.on('message', msg=>{
    
    let args = msg.content.substring(PREFIX.length).split(" ")

    switch(args[0]){
        case 'fetch':
            try{
                fetch('https://www.reddit.com/r/' + args[1] + '.json?limit=5').then(function(response) {
                    return response.json();
              }).then(function(json) {
                for (var i = 0; i < json.data.children.length; i++) {
                    const attachment = new MessageAttachment(json.data.children[i].data.url);
                    msg.channel.send(attachment)
                }
              });
            }catch(e){
                console.log(e.message)
            }
            break
        default:
            return
    }
})

bot.login(token)