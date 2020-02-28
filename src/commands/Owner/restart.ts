import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { token } from "../../Config"
import BotClient from '../../client/BotClient';

export default class RestartCommand extends Command {
    public constructor() {
        super('restart', {
            aliases: ['restart', "rs"],
            category: 'Owner',
            description: {
                content: "Restarts the bot",
                examples: [":?restart"],
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
                    .setDescription(`Client is restarting...`))
                this.client.destroy()
                this.client.login(this.client.token)
                let newe = new MessageEmbed()
                    .setDescription("Restarted!")
                    .setColor("GREEN")
                message.util.send(newe)

            } catch (e) {
                return message.util.send(`Error while shutting down: \`${e.message}\``);
            }

        } else {
            return message.reply("you are not the bot owner!")
        }
    }
}