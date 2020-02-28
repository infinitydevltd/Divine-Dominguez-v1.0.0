import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "Public",
            description: {
                content: "",
                examples: ["ping"],
                usages: "ping"
            },
            ratelimit: 3
        });
    }
    public exec(message: Message) {
        let ping = message.createdTimestamp - message.createdTimestamp
        let choices = ["Is this really my ping", "Is it okay? I cant look", "I hope it isnt bad"]
        let response = choices[Math.floor(Math.random() * choices.length)]
        let pingembed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Bot Latency: \`${ping}\`ms\nAPI Latency: \`${Math.round(this.client.ws.ping)}\`ms`)
        message.util.send(pingembed)
    }
}