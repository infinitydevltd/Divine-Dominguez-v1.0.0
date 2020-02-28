import { Command, version } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';

export default class ReloadAllCommand extends Command {
    public constructor() {
        super('reloadall', {
            aliases: ['reloadall', "rall"],
            category: 'Owner',
            description: {
                content: "Reloads all commands",
                examples: [":?reloadall"],
                usages: "<code>"
            },
            clientPermissions: [],
            userPermissions: [],
            ratelimit: 3,
            ownerOnly: true,
            args: [{
                id: 'code',
                match: 'content',
            }]
        });
    }

    public exec(message, { code }) {
        if (message.author.id == '473276250815856650' || message.author.id == '540219416726601739') {
            let inputembederr = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Error: No code provided...`)
            try {
                this.client.commandHandler.reloadAll()
                message.util.send(new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Successfully reloaded all commands...`))

            } catch (e) {
                return message.channel.send(`Error while reloading: \`${e.message}\``);
            }

        } else {
            return message.reply("you are not the bot owner!").then(msg => msg.delete(5000))
        }
    }
}