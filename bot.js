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

const password = process.env.PASSWORD;

// My expressions
const exps = require('./exps.js');

// getting the giphy sdk to work, I think I could use the API instead
let GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphyToken);

// runs only once when the bot starts
bot.once('ready', () => {
    console.log('Majesto is up and running...');
    bot.user.setActivity('javascript tutorials', {type: 'WATCHING'});
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
        message.channel.send('nice');
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
    // if(message.content == `${prefix}links`) {
    //     message.reply('https://www.youtube.com/watch?v=RkL-jPuHBMw \n https://www.youtube.com/watch?v=EhGEGIBGLu8');
    // }

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

    // bot's activity 
    if (message.content.startsWith(`${prefix}set`)) {
        // configuring the arguements
        let args = message.content.split('_');
        if (args[1] == 'help') {
            message.channel.send('-set_action_thing \n actions: PLAYING, WATCHING, LISTENING');
        } else {
            bot.user.setActivity(args[2], {type: args[1]});
        }
    }

    // na kanw to botaki na stelnei dika mou mnmta voithia
    if (message.content == `${prefix}message_help`) {

        message.channel.send(`${prefix}message_actualMessage_channelID_serverID or \n ${prefix}message_gamers_actualMessage`);

    } else if (message.content.startsWith(`${prefix}message_gamers`)) {

        let arts = message.content.split('_');
        bot.guilds.get('598644805865832467').channels.get('598644806847168697').send(arts[2]);

    } else if (message.content.startsWith(`${prefix}message`)) {

        let args = message.content.split('_');
        bot.guilds.get(args[3]).channels.get(args[2]).send(args[1]);

    }

    // reactions 
    // egw  80% pithanothta na antidrasei
    if(message.author.id == '396103155672154123'){
        
        let chance = Math.floor((Math.random() * 10) + 1);

        if (chance >= 1 && chance < 4) {
            message.react('👍');
        } else if ( chance >= 4 && chance <= 5 ) {
            message.react('❤️');
        } else if (chance == 6) {
            message.react('😍');
        } else if (chance == 7) {
            message.react('😂');
        } else if (chance == 8) {
            message.react('🔫');
        }
    } 

    //thanas gians melvin 50% pithanothta na antidrasei
    if(message.author.id == '559472028973924372' ||
       message.author.id == '396104471819845644' ||
       message.author.id == '397794278673219595' ){
        
        let chance0 = Math.floor((Math.random() * 10) + 1);

        if (chance0 > 5) {
            let chance = Math.floor((Math.random() * 10) + 1);

            if (chance >= 1 && chance < 4) {
                message.react('👍');
            } else if ( chance >= 4 && chance <= 5 ) {
                message.react('❤️');
            } else if (chance == 6) {
                message.react('😍');
            } else if (chance == 7) {
                message.react('😂');
            } else if (chance == 8) {
                message.react('🔫');
            } else if (chance > 8) {
                message.react('😜');
            }
        }
    }

    //oi alloi 30% pithanothta na antidrasei
    if(message.author.id == '687637936698556505' ||
    message.author.id == '375361884422930433' ||
    message.author.id == '310695157387362306' ){
        
        let chance0 = Math.floor((Math.random() * 10) + 1);

        if (chance0 > 7) {
            let chance = Math.floor((Math.random() * 10) + 1);

            if (chance >= 1 && chance < 4) {
                message.react('👍');
            } else if ( chance >= 4 && chance <= 5 ) {
                message.react('❤️');
            } else if (chance == 6) {
                message.react('😍');
            } else if (chance == 7) {
                message.react('😂');
            } else if (chance == 8) {
                message.react('🔫');
            } else if (chance > 8) {
                message.react('😜');
            }
        }
    }

    if(message.author.id == '694293910411018271') {

        let chance = Math.floor((Math.random() * 10) + 1);

        if (chance > 5) {
            message.react('🤮');
        }
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

    // Embed 
    // https://discord.js.org/#/docs/main/stable/class/RichEmbed
    // https://anidiots.guide/first-bot/using-embeds-in-messages
    if (message.content.startsWith(`embed`)) {

        // configuring the arguments
        let args = message.content.split('-');

        if (args[1] == 'help') {
            message.channel.send(`${prefix}embed-serverID-channelID-title-Description
            \n g-o 598644805865832467 , gamer-chat 598644806847168697
            \n t-s 598882399786369064 , test-channel 598891140179165359`);
        } else {
            const embed = new Discord.RichEmbed()
            .setTitle(args[3])
            .setColor(0x246ce0)
            .setDescription(args[4])
            .setFooter('by skipperBlyat');

            bot.guilds.get(args[1]).channels.get(args[2]).send(embed);
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

    // if(message.content.startsWith(`${prefix}play`)){
        
    //     if(message.member.voiceChannel) {

    //         // find the song to play
    //         let urlRegEx = /(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/g
    //         let url = message.content.match(urlRegEx);
            
    //         if (url === null) {
    //             message.channel.send('You should give me a better link.');
    //         }
    //         else {
    //             // Notification
    //             message.react('👍');
    //             // find and join the music channel
    //             message.member.voiceChannel.join()
    //             .then(connection => {
    //                 message.channel.send(`Joined ${message.member.voiceChannel} to play music!`);
    //                 // Stream
    //                 const stream = ytdl(url[0], {filter: 'audioonly'});
    //                 stream.on('error', console.error);
    //                 const dispatcher = connection.playStream(stream, streamOptions);
    //             })
    //             .catch(err => console.log(err));
    //         }
    //     } else {
    //         message.reply('You need to join a voice channel first...');
    //     }
    // }
    // // Stop the streaming
    // if (message.content == `${prefix}plz stop`) {
    //     // react-leave-inform
    //     message.react('😉');
    //     message.member.voiceChannel.leave();
    //     message.channel.send('ok dude...');
    // }

    // sending available meme formats
    if (message.content == `${prefix}memesf`) {
        // fetching the memes and filtering those with the 2 boxes
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => {
            let memes =data.data.memes.filter(meme => meme.box_count == 2);
            let msg1 = '';
            for(let i = 0; i < 40; i++) {
                msg1 += memes[i].name +"  --id:" + memes[i].id + "\n";
            }
            let msg2 = '';
            for(let i = 40; i < memes.length; i++) {
                msg2 += memes[i].name + "  --id:" + memes[i].id + "\n";
            }
            message.channel.send(msg1);
            message.channel.send(msg2);
        })
        .catch(err => console.log(err));
    } else if (message.content == `${prefix}memes-help`) {

        message.channel.send(`${prefix}meme-id-text1-text2 or \n${prefix}meme-id-text1-text2-channelID-serverID or \n${prefix}meme-id-text1-text2-gamers`);

    } else if (message.content.startsWith(`${prefix}meme`)) {
        
        // doing the meme by this stupid website
        let msg = message.content.split('-');
        let id = msg[2];
        let text0 = msg[3];
        let text1 = msg[4];
        let channelID = msg[5];
        let serverID = msg[6];
        fetch(`https://api.imgflip.com/caption_image?template_id=${id}&username=danikas&password=${password}&text0=${text0}&text1=${text1}`, {
        method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            let url = data.data.url;

            if (channelID == 'gamers') {
                bot.guilds.get('598644805865832467').channels.get('598644806847168697').send('lol', {
                    files: [url]
                })
            } else if (channelID === undefined || serverID === undefined){
                message.channel.send("LOL...", {
                    files: [url]
                });
            } else {
                bot.guilds.get(serverID).channels.get(channelID).send('lol', {
                    files: [url]
                });
            }
        })
        .catch(err => {
            console.log(err);
            message.channel.send('Sth went wrong dear gamer, send me a better message');
        });
    }

    let regex = /majesto\s(you)?/gi; 

    if (/suck|pussy|malakas|hope|swear|death|fuck|shit|fucking|bastard|bastarde|mpastarde|malaka|gamhmene|gamidi|pousth|pusth|poustara|arxidi|lougra|shut up|/gi.test(message)) {
        if (regex.test(message)) {
            if (/suck/gi.test(message)) {
                message.channel.send('Unfortunately, my friend you are the one who sucks.');
            } else if (/pussy/gi.test(message)) {
                message.channel.send('I may be a pussy but I fucked your mum.');
            } else if (/malakas?/gi.test(message)) {
                message.channel.send('you a big blyat');
            } else {

            let expRandom = Math.floor(Math.random() * exps.swearing.length);
            message.channel.send(exps.swearing[expRandom]);
            }
        
        }
    }   
});

bot.on('message', message => {
    if(message.content == `${prefix}majesto`) {
        message.channel.send(`-majesto \n dick \n Who are you ? \n nice \n -set_help \n -send my avatar \n embed-help \n -send your avatar \n-memesf \n -memes-help \n -message_help\n send Twitter bot link \n -weather \n -quote \n borderlands \n gamenight \n -dogif`);
    }
});

bot.login(token); //it's gonna work
// testing