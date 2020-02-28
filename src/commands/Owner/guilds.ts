import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';

export default class EvalCommand extends Command {
    public constructor() {
        super('guilds', {
            aliases: ['guilds', "g", "servers"],
            category: 'Owner',
            description: {
                content: "Shows the servers the bot is in",
                examples: [":?guilds"],
                usages: ""
            },
            clientPermissions: [],
            userPermissions: [],
            ratelimit: 3,
            ownerOnly: true,
            args: [{
                id: 'text',
                type: 'text',
                match: 'content'
            }]
        });
    }

    public exec(message, args: Message) {
        if (message.author.id == '473276250815856650' || message.author.id == '540219416726601739') {
            let servers = this.client.guilds.map(g => `${g.name.replace(/[^\x00-\x7F]/g, "")}${" ".repeat(Math.floor(Math.max(...this.client.guilds.map(g => g.name.length))) + - g.name.replace(/[^\x00-\x7F]/g, "").length)} | ${g.id}`).join('\n')
            let guilds = new MessageEmbed()
                .setAuthor(`Guilds Command | ${message.guild.name}`)
                .setColor(`DARK_BLUE`)
                .setDescription(`\`\`\`ini\n[ ${servers} ]\`\`\``)
            message.util.send(guilds)
        } else {
            message.util.reply(`No No No...`)
        }
    }
}