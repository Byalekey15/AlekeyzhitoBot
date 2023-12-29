const { prefix, token } = require('./config.json');
const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require('fs')
let { readdirSync } = require('fs');
const { default: discordButtons } = require('discord-buttons');

client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Cargando Librerias...");
    console.log("Conectando con el servidor");
    console.log("Conexion establecida");
    console.log(`Session iniciada: ${client.user.tag}`);
    presence();
});


function presence() {
    client.user.setPresence({
        status: "online",
        activity: {
            name: "Bad Bunny :v",
            type: "LISTENING",
            url: "https://www.twitch.tv/alekeyzhito"
        }
    })
}



client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    let usuario = message.mentions.members.first() || message.member;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
    if (cmd) {
        cmd.execute(client, message, args)
    }
});

client.login(token)