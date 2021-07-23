const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const {token} = require("./config.json");

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);

    // Import last saved timesheet file with User IDs and last message timestamps.
    userIds = JSON.parse(fs.readFileSync("persistent-list.txt"));

    console.log("Ready");
});

// ------ Variables -------

//List of roles to exclude from bot (Currently non-working).
let modRoles = ["Mods","Devs"];
// Channel ID to watch.
let channelId = "868227546972586025";
//Channel ID to report in.
let reportChannelId = "868246970467233823";
// ID of Bot user;
let botID = "868223435233435678";
// Enable/disable reporting of slowmode violation.
let reporting = true;
// Message to be sent after a user ping in the reports channel.
let reportMessage = "you cannot send another message within 2 minutes of your last!"

// Timeout time in ms.
let timeoutTime = 120000; 

// ------------------------

let userIds = {};

client.on("message", message => {
    if(message.channel.id === channelId && message.author.id != botID){
        RunOnMessage(message);
    }    
})

    //check all json entries for difference in time, if current time > 2 weeks since message creation remove entry

function RunOnMessage (message){
    let currentDate = new Date();


    for(key in userIds){
        if(currentDate - new Date(userIds[key]) > timeoutTime){
            // Deletes JSON entry if time difference since last message is longer than the timeout time.
            delete userIds[key]
            console.log("deleting key " + key);            
        }
        else{
            // Stops running through list after first non delete - list is in time order, starting at oldest.
            console.log("breaking - " + userIds[key])
            break;
        }
    };
    

    // Check if user has already sent a message within the time, deletes the message and tells them in the reporting channel.
    if(userIds.hasOwnProperty(message.author.id)){
        message.delete()
        if(reporting){
            let reportChannel = client.channels.cache.get(reportChannelId);
            reportChannel.send(`${message.author}, ${reportMessage}`);    
        }
        
    }
    else{
        userIds[message.author.id] = message.createdAt
    }

    // Writes current timesheet to file, this gives persistence through restarts.
    fs.writeFile("persistent-list.txt",JSON.stringify(userIds),function(err){if(err) throw err;});
}


client.login(token);