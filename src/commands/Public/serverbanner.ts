import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class ServerBannerCommand extends Command {
    public constructor() {
        super("serverbanner", {
            aliases: ["serverbanner", "sb"],
            category: "Public",
            description: {
                content: "Shows your server banner",
                examples: ["serverbanner"],
                usages: "serverbanner"
            },
            ratelimit: 2
        });
    }
    public exec(message: Message) {
        let siembed = new MessageEmbed()
            .setColor("DARK_BLUE")
            .setImage(message.guild.bannerURL({ size: 2048 }))
        message.util.send(siembed)
    }
}