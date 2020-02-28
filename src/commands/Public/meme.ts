import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import request from "request";

export default class MemeCommand extends Command {
    public constructor() {
        super("meme", {
            aliases: ["meme"],
            category: "Public",
            description: {
                content: "Displays a random meme from reddit",
                examples: [":?meme"],
            },
            ratelimit: 3
        });
    }
    public exec(message: Message): any {
        request("https://reddit.com/r/meme/random.json", (error, response, body) => {
            body = JSON.parse(body)
            let bod = body[0]
            let data = bod["data"]
            let children = data["children"]
            let childre = children[0]
            let data2 = childre["data"]
            if (data2["url"].match(".jpg") || data2["url"].match(".png")) {
                var embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("r/meme")
                    .setURL(`https://reddit.com${data2["permalink"]}`)
                    .setFooter(`Meme by ${data2["author"]}`)
                    .setImage(data2["url"])

                message.util.send({ embed });
            }
        })
    }
}