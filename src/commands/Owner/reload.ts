import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { inspect } from "util";

export default class ReloadCommand extends Command {
    public constructor() {
        super('reload', {
            aliases: ['reload', "rcmd"],
            category: 'Owner',
            description: {
                content: "Reloads a command",
                examples: [":?reload"],
                usages: "<cmd>"
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

    public exec(message, { command }) {
        if (message.author.id == '473276250815856650' || message.author.id == '540219416726601739') {
            let inputembederr = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Error: No code provided...`)
            try {
                let cmd = Command
                this.client.commandHandler.reload(command.id)
                message.util.send(new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Successfully reloaded \`${command}\`...`))

            } catch (e) {
                return message.channel.send(`Error while reloading: \`${e.message}\``);
            }

        } else {
            return message.reply("you are not the bot owner!").then(msg => msg.delete(5000))
        }
    }
}