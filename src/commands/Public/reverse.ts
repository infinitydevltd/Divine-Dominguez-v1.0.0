import { Command } from "discord-akairo";
import { MessageEmbed, Message, User } from "discord.js";

export default class ReverseCommand extends Command {
    public constructor() {
        super("reverse", {
            aliases: ["reverse", "backwards"],
            category: "Public",
            description: {
                content: "Reverses a text",
                examples: [":?reverse i am coder"],
                usages: "<text>"
            },
            args: [{
                id: 'content', type: 'string', match: 'rest', default: null,
                // prompt: {
                //     start: `Please mention a member`,
                //     retry: `Please mention a member`,
                // }
            }],
            ratelimit: 2,
            cooldown: 15000,
        });
    }
    public exec(message: Message, { content }: { content: string }): any {
        // let args = content.split("").join("")
        let argsrev = content.split("").reverse().join("")
        message.util.send(new MessageEmbed()
            .setColor("DARK_BLUE")
            .setDescription(`${argsrev}`))

    }
}