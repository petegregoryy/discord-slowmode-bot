const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const {token} = require("./config.json");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
    userIds = JSON.parse(fs.readFileSync("persistent-list.txt"));
    console.log("Ready");
});

//Variables
let modRoles = ["Mods","Devs"];
let channelId = "868227546972586025";
let reportChannelId = "868246970467233823";
let botID = "868223435233435678";

let userIds = {};
// Functions

client.on("message", message => {
    if(message.channel.id === channelId && message.author.id != botID){
        console.log(message.author.tag + " - " + message.content);
        RunOnMessage(message);
    }    
    //console.log(message);
})


function RunOnMessage (message){
    let currentDate = new Date();
    //check all json entries for difference in time, if current time > 2 weeks since message creation remove entry

    for(key in userIds){
        if(currentDate - new Date(userIds[key]) > 120000){
            delete userIds[key]
            console.log("deleting key");            
        }
        else{
            console.log("breaking - " + userIds[key])
            break;
        }
        console.log(currentDate - new Date(userIds[key]));
    };
    


    if(userIds.hasOwnProperty(message.author.id)){
        message.delete()
        let reportChannel = client.channels.cache.get(reportChannelId);
        reportChannel.send(`${message.author}, you cannot send another message within 2 minutes of your last!`);
    }
    else{
        //message.reply("message added to json")
        userIds[message.author.id] = message.createdAt
    }
    console.log(userIds);
    fs.writeFile("persistent-list.txt",JSON.stringify(userIds),function(err){if(err) throw err;});
}


client.login(token);