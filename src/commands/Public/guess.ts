import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class RandomNumCommand extends Command {
    public constructor() {
        super("guess", {
            aliases: ["guess"],
            category: "Public",
            description: {
                content: "Generates a random number between 1 and 29 and u need to guess it",
                examples: ["guess 20"],
                usages: "<number>"
            },
            args: [
                {
                    id: 'number', type: 'number', match: "rest",
                },
            ],
            ratelimit: 3
        });
    }
    public exec(message: Message, { number }: { number: number }): any {
        // if(number) return message.util.send("Please select a number between 1 and 65")
        let random = Math.floor(Math.random() * 20)
        console.log(random)
        let randomembed = new MessageEmbed()
        if (random == number) {
            randomembed.setColor(`GREEN`)
            randomembed.setDescription(`You won! The number is ${random}`)
        } else {
            randomembed.setColor(`RED`)
            randomembed.setDescription(`You lose! The number is ${random}`)
        }
        message.util.send(randomembed)
    }
}