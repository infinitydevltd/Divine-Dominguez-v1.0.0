import { Command } from "discord-akairo";
import { Message } from "discord.js";
import figlet from "figlet"

export default class AsciiArtCommand extends Command {
    public constructor() {
        super("ascii", {
            aliases: ["ascii", "asc-art"],
            category: "Public",
            description: {
                content: "Displays a text into ascii-art",
                examples: [":?ascii Hello"],
                usages: "<text>"
            },
            args: [{
                id: 'one', type: 'string', match: "rest",
                prompt: {
                    start: `Please provide some text`,
                }
            }],
            ratelimit: 2
        });
    }
    public exec(message: Message, { one }: { one: string }): any {
        try {
            if (!one) return message.reply('Please specify texts for the ascii conversion');
            figlet.text(one, {
                font: "ANSI Shadow",
                horizontalLayout: "default",
                verticalLayout: "default"
            }, function (err, data) {
                if (err) {
                    console.log("Somthing Went Wrong...")
                    console.dir(err)
                    return;
                }
                message.util.send(data, {
                    code: "md"
                })
            })
        } catch (err) {
            message.reply(err)
        }
    }
}