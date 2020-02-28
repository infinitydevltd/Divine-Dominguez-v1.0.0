import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';

export default class ShutDownCommand extends Command {
    public constructor() {
        super('shutdown', {
            aliases: ['shutdown', "exit"],
            category: 'Owner',
            description: {
                content: "Shutdowns the bot",
                examples: [":?shutdown"],
                usages: ""
            },
            clientPermissions: [],
            userPermissions: [],
            ratelimit: 3,
            ownerOnly: true,
            args: [{
                id: 'content',
                match: 'content',
            }]
        });
    }

    public exec(message, args: Message) {
        if (message.author.id == '473276250815856650' || message.author.id == '540219416726601739') {
            let inputembederr = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Error: No code provided...`)
            try {
                message.util.send(new MessageEmbed()
                    .setColor("DARK_BLUE")
                    .setDescription(`Client is shutting down`))
                process.exit()

            } catch (e) {
                return message.channel.send(`Error while shutting down: \`${e.message}\``);
            }

        } else {
            return message.reply("you are not the bot owner!").then(msg => msg.delete(5000))
        }
    }
}