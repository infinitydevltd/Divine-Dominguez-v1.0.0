import { Command, version } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';

export default class SetPremiumCommand extends Command {
    public constructor() {
        super('setpremium', {
            aliases: ['setpremium', "spremium"],
            category: 'Owner',
            description: {
                content: "",
                examples: [],
                usages: ""
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
        this.client.settings.set(message.guild, "config.premium", [])
        message.util.send(new MessageEmbed()
        .setDescription(`Successfully added this server to the premium list!`)
        .setColor(`GREEN`))
    }
}