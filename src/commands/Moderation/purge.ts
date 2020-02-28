import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch"

export default class PurgeCommand extends Command {
    public constructor() {
        super("purge", {
            aliases: ["purge", "clean"],
            category: "Moderation",
            description: {
                examples: [":?purge 20"],
                usages: "<number between 1 and 100>"
            },
            args: [{
                id: 'one', type: 'number',
                prompt: {
                    start: `Please provide a number between 1 - 100`,
                    retry: `Please provide a number **BETWEEN** 1 and 100`
                }
            }],
            ratelimit: 2
        });
    }
    public async exec(message: Message, { one }: { one: number }): Promise<Message> {
        if(!one || isNaN(one) || one < 2 || one > 100) return message.util.send(`Please provide a **number** from \`2-100\``);
        const deleted = await message.channel.messages.fetch({ limit: one });    
          message.delete();
          message.channel.bulkDelete(deleted);
            return message.util.send(`Deleted: \`${deleted.size}/${one}\` messages.`)
                .then(m => m.delete({ timeout: 10000 }));
    }
}