import { Command } from 'discord-akairo';
import { Message, User } from 'discord.js';

export default class BlacklistCommand extends Command {
    public constructor() {
        super('blacklist', {
            aliases: ['blacklist'],
            category: 'Owner',
            description: {
                content: "Blacklists a user from the bot",
                examples: [":?blacklist 123456789101"],
                usages: "<User ID>"
            },
            ratelimit: 3,
            ownerOnly: false,
            args: [{
                id: 'user',
                type: (_, str) => {
                    const user = this.client.users.fetch(str).catch(() => null)
                    if (!user) return null;
                    return user;
                },
                prompt: {
                    start: (message: Message) => `${message.author} Please specify a User ID`,
                    retry: (message: Message) => `${message.author} Please specify a **VALID** User ID`
                }
            }
            ],
        });
    }

    public exec(message: Message, { user }: { user: User }): any {
        let list = this.client.settings.get("global", "user.blacklisted", []);

        if (list.includes(user.id)) {
            list.splice(list.indexOf(user.id), 1)

            this.client.settings.set("global", "user.blacklisted", list)
            return message.util.send(`Successfully removed \`${user.tag}\` from the blacklist!`)
        } else {
            list.push(user.id)
            this.client.settings.set("global", "user.blacklisted", list)
            return message.util.send(`Successfully blacklisted \`${user.tag}\`!`)
        }
    }
}