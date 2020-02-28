import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';

export default class HelpCommand extends Command {
    public constructor() {
        super('help', {
            aliases: ['help', 'commands'],
            category: 'Public',
            description: {
                content: "Shows the commands",
                examples: ["h", "cmds"],
                usages: "help"
            },
            ratelimit: 3,
            cooldown: 4000,
            args: [{
                id: 'command',
                type: 'commandAlias',
                match: 'content'
            }]
        });
    }

    public exec(message: Message, { command }) {
        let prefix = this.client.settings.get(message.guild, "config.prefix", [])
        if (prefix == null) prefix = ':?'
        if (!command) {
            const embed = new MessageEmbed();
            this.handler.categories.forEach((cm, category) => {

                const directories = cm.filter(cmd => cmd.category === cm).size;
                let mappedOut = cm.map(x => `\`${prefix}${x}\``).join(', ')
                // q   if (category === 'Owner' || category === 'Owner' && !this.client.ownerID.includes(message.author.id)) mappedOut = '`No commands available...`'               
                embed.addField(`**${category} Commands** | ${directories}`, mappedOut)
                    .setColor("DARK_BLUE")
                    // .setFooter(`Server Prefix: ${prefix}`)
                    .setAuthor(`Help Menu | ${message.guild.name}`, message.guild.iconURL())
                    .setTimestamp()
                    .setThumbnail(this.client.user.displayAvatarURL())

            });

            return message.util.send({ embed });

        } else if (command) {
            const cmd = command;
            const embed = new MessageEmbed()
                .setColor("DARK_BLUE")
                .setAuthor(`Help: ${cmd.aliases[0]} | ${message.guild.name}`, message.guild.iconURL())
                .setDescription(`
                    **Command Name**: \`${cmd.aliases[0]}\`
                    **Command Aliases**: ${`${cmd.aliases.map(x => `\`${x}\``).join(', ') || 'No Aliases'}`}
                    **Command Ratelimit**: \`${cmd.ratelimit}\`
                    **Command Description**: ${cmd.description.content ? cmd.description.content : 'No Description Provided...'}
                     **Command Disabled:** ${cmd.description.disabled ? "Yes" : "No"}
                    ==============================================
                    **User Permissions:**: ${cmd.userPermissions ? cmd.userPermissions : 'None'}
                    **Bot Permissions:**: ${cmd.clientPermissions ? cmd.clientPermissions : 'None'}
                    **Owner Only:** ${cmd.ownerOnly ? "Yes" : "No"}
                    **Command Examples:**:\n\`\`\`${cmd.description.examples.join('\n') || cmd.aliases[0]}\`\`\`
                `)
                .setFooter(`Syntax: [required] : <optional>`)
            return message.util.send({ embed });
        }
    }
}