import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
// import { inspect } from "util";

export default class PinCommand extends Command {
    public constructor() {
        super('pin', {
            aliases: ['pin'],
            category: 'Moderation',
            description: {
                content: "Pins a message",
                examples: [":?pin <msg id>"],
                usages: "<message id>"
            },
            clientPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"],
            ratelimit: 3,
            ownerOnly: true,
            args: [{
                id: 'msg',
                type: 'message',
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
        await message.pin()
        return message.util.send(new MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(`The Message [Link](${msg.url}) was successfully pinned!`))
    }
}