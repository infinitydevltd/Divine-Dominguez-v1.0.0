import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
// import { inspect } from "util";

export default class UnPinCommand extends Command {
    public constructor() {
        super('unpin', {
            aliases: ['unpin'],
            category: 'Moderation',
            description: {
                content: "Unpins a message",
                examples: [":?unpin <msg id>"],
                usages: "<message id>"
            },
            clientPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"],
            ratelimit: 3,
            ownerOnly: true,
            args: [{
                id: 'msg',
                type: async (msg: Message, str: string): Promise<Message | null> => {
                    if (!str) return null;
                    let message = await msg.channel.messages.fetch(str).catch(() => {
                        return null;
                    });

                    if (!message.pinned || !message.pinnable) return null;

                    return message;
                },
                match: 'rest',
                prompt: {
                    start: (message: Message): string => `${message.author} Please provide a message link`,
                    retry: (message: Message): string => `${message.author} Please provide a **valid** message link`,

                }
            }
            ]
        });
    }

    public async exec(message: Message, { msg }: { msg: any }): Promise<Message> {
        await message.unpin()
        return message.util.send(new MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(`The Message [Link](${msg.url}) was successfully unpinned!`))
    }
}