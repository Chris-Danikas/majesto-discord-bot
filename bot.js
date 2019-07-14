const Discord = require('discord.js');
const bot = new Discord.Client();

const fetch = require('node-fetch');
require('dotenv').config();

const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

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

    // make him not reply on his own messages
    if(message.author.id == '598886428914614288') {
        return;
    }

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

    // Test links
    if(message.content == `${prefix}links`) {
        message.reply('https://www.youtube.com/watch?v=RkL-jPuHBMw \n https://www.youtube.com/watch?v=EhGEGIBGLu8');
    }

    // cool
    if(message.content == 'cool') {
        message.channel.send('Yeah cool...');
    }

    // user's avatar 
    if(message.content == `${prefix}send my avatar`) {
        message.reply(message.author.avatarURL);
    }

    // bot's avatar
    if(message.content == `${prefix}send your avatar`) {
        const attachment = new Discord.Attachment('./majesto.jpg');
        message.channel.send(`That's me ${message.author}`, attachment);
    }

    // reactions
    if(message.author.id == '396103155672154123'){
        message.react('👍');
    }

});

// messages with simple fetching
bot.on('message', async message => {

    // make him not reply on his own messages
    if(message.author.id == '598886428914614288') {
        return;
    }

    // Weather in Tyrnavos
    if(message.content == `${prefix}weather`) {
        try {
            message.react('😀');
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

    // Quote of the day 
    if(message.content == `${prefix}quote`) {
        try {
            message.react('😍');
            const URL = 'http://quotes.rest/qod.json';
            const response = await fetch(URL);
            const json = await response.json();
            let msg = ` Quote of the day: \n ${json.contents.quotes[0].quote}  \n   -${json.contents.quotes[0].author}`;
            message.channel.send(msg);
        } catch (err) {
            console.log(err);
        }
    }
});


// messages with gifs
bot.on('message', message => {

    // make him not reply on his own messages
    if(message.author.id == '598886428914614288') {
        return;
    }

    // Borderlands
    // Checks for borderlands
    if(/borderlands|bd2|bdtps/gi.test(message.content)) {

        giphy.search('gifs', {"q": "borderlands"})
        .then(response => {

            message.react('💜');
            // Gets random gif from the searched ones
            let totalResponses = response.data.length;
            let responseIndex = Math.floor((Math.random() * 10) + 1 ) % totalResponses;
            let responseFinal = response.data[responseIndex];

            message.channel.send("Borderlands is awesome dude...", {
                files: [responseFinal.images.fixed_height.url]
            });

        })
        .catch(err => console.log(err));
    }

    // Game night
    let regex = /(it's||its)(\s*)?(\w*)?(\s*)?(\w*)?gamenight/gi
    // Checks if it's gamenight
    if(regex.test(message.content)) {

        message.react('😍');
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
   
    // make him not reply on his own messages
    if(message.author.id == '598886428914614288') {
        return;
    }

    if(message.content.startsWith(`${prefix}play`)){
        
        if(message.member.voiceChannel) {

            // find the song to play
            let urlRegEx = /(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/g
            let url = message.content.match(urlRegEx);
            
            if (url === null) {
                message.channel.send('You should give me a better link.');
            }
            else {
                // Notification
                message.react('👍');
                // find and join the music channel
                message.member.voiceChannel.join()
                .then(connection => {
                    message.channel.send(`Joined ${message.member.voiceChannel} to play music!`);
                    // Stream
                    const stream = ytdl(url[0], {filter: 'audioonly'});
                    const dispatcher = connection.playStream(stream, streamOptions);
                })
                .catch(err => console.log(err));
            }
        } else {
            message.reply('You need to join a voice channel first...');
        }
    }
    // Stop the streaming
    if(message.content == `${prefix}plz stop`){
        // react-leave-inform
        message.react('😉');
        message.member.voiceChannel.leave();
        message.channel.send('ok dude...');
    }
});

bot.on('message', message => {
    if(message.content == `${prefix}majesto`) {
        message.channel.send(`-majesto \n dick \n Who are you ? \n nice \n send Twitter bot link \n -weather \n -quote \n borderlands \n gamenight \n -dogif \n -link \n -play <youtube link> \n -plz stop`);
    }
});

bot.login(token); //it's gonna work