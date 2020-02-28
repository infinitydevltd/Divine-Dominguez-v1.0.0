import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags"

export default class RoleinfoCommand extends Command {
    public constructor() {
        super("roleinfo", {
            aliases: ["roleinfo", "ri"],
            category: "Public",
            description: {
                examples: [":?roleinfo Member"],
                usages: "<role name>"
            },
            args: [{
                id: 'one', type: 'string', match: "rest",
                prompt: {
                    start: `Please provide a role name`,
                    retry: `Please provide a valid role name`
                }
            }],
            ratelimit: 2
        });
    }
    public exec(message: Message, { one }: { one: string }): any {
        let role = message.guild.roles.find(r => r.name.toLowerCase().includes(one)) || message.mentions.roles.first() || message.guild.roles.get(one)
        if (!role) return message.reply("Sorry! I couldn't find that role.")

        const emb = new MessageEmbed()
            .setColor(role.hexColor)
            .setDescription('• Role Information')
            .addField(`• **Role Name:**`, role.name, true)
            .addField(`• **Role ID:**`, role.id, true)
            .addField(`• **Role Members:**`, role.members.size, true)
            .addField(`• **Role Colour:**`, role.hexColor, true)
            .addField(`• **Role Mentionable:**`, `${role.mentionable ? "Yes" : "No"}`, true)
            .addField(`• **Role Hoisted:**`, `${role.hoist ? "Yes" : "No"}`, true)
            .addField(`• **Role Managed:**`, `${role.managed ? "Yes" : "No"}`, true)
            .addField(`• ** Role Created:** `, `${role.createdAt.toLocaleString('en-GB')}`, true)
            .addField(`• ** Role Posititon:** `, `${role.rawPosition}`, true)
            .addField(`• ** Role Permissions:** `, `\`${role.permissions.toArray().join(", ")}\``)
        message.util.send(emb)
    }
}