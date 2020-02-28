import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { TIMEOUT } from 'dns';

export default class SetPrefixCommand extends Command {
    public constructor() {
        super('setprefix', {
            aliases: ['setprefix', "sprefix"],
            category: 'Server Owner',
            description: {
                content: "Sets the bot prefix in the current guild",
                examples: [":?sprefix !"],
                usages: "<prefix>"
            },
            userPermissions: ["MANAGE_GUILD"],
            ratelimit: 3,
            ownerOnly: false,
            args: [{
                id: 'prefix',
                type: "string",
                prompt: {
                    start: (message: Message): string => `${message.author} Please specify a prefix`
                }
            }
            ],
        });
    }

    public exec(message: Message, { prefix }: { prefix: string }): any {
        this.client.settings.set(message.guild, "config.prefix", prefix)
        message.util.send(`Successfully updated the server prefix to: \`${prefix}\`!`)
    }
}