const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config();

// environment variables add them later
const prefix = process.env.PREFIX;
const giphyToken = process.env.GIPHY_TOKEN;
const token = process.env.DISCORD_TOKEN;

// My expressions
const exps = require('./exps.js');

// getting the giphy sdk to work, I think I could use the API instead
let GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphyToken);

// runs only once when the bot starts
bot.once('ready', () => {
    console.log('Majesto is up and running...');
});

// when someone types dick it responses with @mention
bot.on('message', message => {
    if(message.content == 'dick') {
        message.reply('You think you\'re funny ? ');  // message.channel.send('pong');
    }
});

// Who are you ?
bot.on('message', message => {

    if(/(@Majesto|Majesto)?\s*Who\s*are\s*you\s*\??/gi.test(message.content)) {
        message.reply("Je suis Majesto et je parle francais.");
    }
})

// Borderlands
bot.on('message', message => {

    // Checks for borderlands
    if(/borderlands|bd2|bdtps/gi.test(message.content)) {

        giphy.search('gifs', {"q": "borderlands"})
        .then(response => {

            // Gets random gif from the searched ones
            let totalResponses = response.data.length;
            let responseIndex = Math.floor((Math.random() * 10) + 1 ) % totalResponses;
            let responseFinal = response.data[responseIndex];

            message.channel.send("Border-lands is awesome dude...", {
                files: [responseFinal.images.fixed_height.url]
            });

        })
        .catch(err => console.log(err));
    }
});

// Game night
bot.on('message', message => {

    let regex = /(it's||its)(\s*)?(\w*)?(\s*)?(\w*)?gamenight/gi

    // Checks if it's gamenight
    if(regex.test(message.content)) {

        giphy.search('gifs', {"q": "gamer"})
        .then(response => {

            // Gets random expression 
            let expRandom = Math.floor(Math.random() * exps.dogif.length);

            // Same as the dogif
            let totalResponses = response.data.length;
            let responseIndex = Math.floor((Math.random() * 10) + 1 ) % totalResponses;
            let responseFinal = response.data[responseIndex];

            message.channel.send(exps.gamenight[expRandom], {
                files: [responseFinal.images.fixed_height.url]
            });
        })
        .catch(err => console.log(err));
    }
});

// Types a dog gif
bot.on('message', message => {
    if(message.content == `${prefix}dogif`) {
        giphy.search('gifs', {"q": "dog"})
        .then(response => {

            // Gets random expression 
            let expRandom = Math.floor(Math.random() * exps.dogif.length);

            // Gets random gif from the searched ones
            let totalResponses = response.data.length;
            let responseIndex = Math.floor((Math.random() * 10) + 1 ) % totalResponses;
            let responseFinal = response.data[responseIndex];

            // console.log(expRandom);
            // console.log('total responses:', totalResponses);
            // console.log('response index:', responseIndex);

            message.channel.send(exps.dogif[expRandom], {
                files: [responseFinal.images.fixed_height.url]
            });

        })
        .catch(err => console.log(err));
    }
});

bot.on('message', message => {
    if(message.content == `${prefix}help_gamer`) {
        message.channel.send(`!help \n dick \n Who are you ? \n border-lands \n game-night \n !dogif`);
    }
})

bot.login(token);