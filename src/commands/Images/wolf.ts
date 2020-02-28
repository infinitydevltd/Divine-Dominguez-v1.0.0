import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch"

export default class extends Command {
    public constructor() {
        super("wolf", {
            aliases: ["wolf", "wolves"],
            category: "Images",
            description: {
                content: "Shows an image with a wolf",
            },
        });
    }

    public async exec(message: Message) {
        fetch("https://www.reddit.com/r/wolves.json?limit=100")
            .then(res => res.json()).then(body => {
                if (!body) return message.reply(" whoops. I broke, try again!")

                let embed = new MessageEmbed()
                    .setColor(`DARK_BLUE`)
                    .setAuthor(`${this.client.user.username} Wolfs!`, message.guild.iconURL())
                    .setImage(body.file)
                    .setTimestamp()
                    .setFooter(this.client.user.username.toUpperCase(), this.client.user.displayAvatarURL())

                message.util.send(embed)
            })
    }
}