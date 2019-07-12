const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
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

// simple messages
bot.on('message', message => {

    // when someone types dick it responses with @mention
    if(message.content == 'dick') {
        message.reply('You think you\'re funny ? ');  // message.channel.send('pong');
        console.log(message);
    }

    // nice
    if(message.content == 'nice') {
        message.channel.send('ye');
    }

    // Who are you ?
    if(/(@Majesto|Majesto)?\s*Who\s*are\s*you\s*\??/gi.test(message.content)) {
        message.reply("Je suis Majesto et je parle francais.");
    }

    // Twitter bot
    let regex = /send([a-zA-Z0-9\s]*)(Twitter|twitter)(bot)?([a-zA-Z0-9\s]*)link/gi
    if(regex.test(message.content)) {
        message.reply("https://twitter.com/myDabBot1");
    }

    // reactions 
    if(message.author.id == '396103155672154123'){
        message.react('👍');
    }

});

// messages with simple fetching
bot.on('message', async message => {

    // Weather in Tyrnavos
    if(message.content == `${prefix}weather`) {
        try {
            const URL = 'https://api.openweathermap.org/data/2.5/weather?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric';
            const response = await fetch(URL);
            const json = await response.json();
            let msg = `Weather in Tyrnavos city:
            Temp: ${json.main.temp}, ${json.weather[0].description}
            Perfect weather for gaming guys omg  :joy: :gun: :fire: `;
            message.channel.send(msg);
        } catch (err) {
            message.channel.send(err);
        }
    }
});


// messages with gifs
bot.on('message', message => {

    // Borderlands
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

    // Game night
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

    // Types a dog gif
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
    if(message.content == `${prefix}majesto`) {
        message.channel.send(`!help \n dick \n Who-are-you ? \n nice \n send link Twitter bot \n !weather \n border-lands \n game-night \n !dogif`);
    }
})

bot.login(token);