const Discord = require('discord.js');
const bot = new Discord.Client();

// environment variables add them later
const prefix = '!';
const giphyToken = 'FJyt9La4sNWsICWCzL5GVmXb0b7uacWP';

// My expressions
const expDogif =  [
    "There you are, ",
    "Here you go buddy...",
    "Behold Gamers",
    "Look what I found",
    "Pretty cute",
    "I love dogs",
    "Je parle francais et here is a dogif"
];

// getting the giphy sdk to work, I think I could use the API instead
let GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphyToken);

// runs only once when the bot starts
bot.once('ready', () => {
    console.log('Majesto is up and running...');
});

// when someone types dick it responses with @mention
bot.on('message', (message) => {
    if(message.content == 'dick') {
        message.reply('You think you\'re funny ? ');  // message.channel.send('pong');
    }
});

// Types a dog gif
bot.on('message', (message) => {
    if(message.content == `${prefix}dogif`) {
        giphy.search('gifs', {"q": "dog"})
        .then(response => {

            // Gets random expression 
            let expRandom = Math.floor(Math.random() * expDogif.length);

            // Gets random gif from the searched ones
            let totalResponses = response.data.length;
            let responseIndex = Math.floor((Math.random() * 10) + 1 ) % totalResponses;
            let responseFinal = response.data[responseIndex];

            console.log(expRandom);
            console.log('total responses:', totalResponses);
            console.log('response index:', responseIndex);

            message.channel.send(expDogif[expRandom], {
                files: [responseFinal.images.fixed_height.url]
            });

        })
        .catch(err => console.log(`Sorry dude couldn\'t find any \'cause  ${err}`))
    }
});

const token = 'NTk4ODg2NDI4OTE0NjE0Mjg4.XSdLGA.RGu-XyTrKGJdSNcz8rDrc3CoYKE';
bot.login(token);