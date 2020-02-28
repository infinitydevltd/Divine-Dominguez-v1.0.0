import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import math from "mathjs"

export default class RNCommand extends Command {
    public constructor() {
        super("randomnumber", {
            aliases: ["randomnumber", "rnumber", "rnun"],
            category: "Public",
            description: {
                content: "Generates a random number from 1 - 1000",
                examples: ["randomnumber"],
                usages: "randomnumber"
            },
            ratelimit: 3
        });
    }
    public exec(message: Message) {
        let number = Math.ceil(Math.random() * 1000);
        let num = new MessageEmbed()
        .setColor("DARK_BLUE")
        .setDescription(`Random picked number is\n\`\`\`${number}\`\`\``)
        message.util.send(num)
    }
}