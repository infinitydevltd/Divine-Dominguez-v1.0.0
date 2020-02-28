import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { GuildMember } from "discord.js";
import { User } from "discord.js";

export default class UserInfoCommand extends Command {
    public constructor() {
        super("userinfo", {
            aliases: ["userinfo", "ui"],
            category: "Public",
            description: {
                content: "Checks the ping of the latency to the API",
                examples: ["userinfo", "ui"],
                usages: "userinfo"
            },
            args: [
                {
                    id: 'member', type: 'member', match: "rest",
                    default: _ => _.member
                },
            ],
            ratelimit: 3
        });
    }
    public exec(message: Message, { member }): any {
        const status = {
            online: "<:gonline:671751463688601602> Online",
            dnd: "<:gdnd:671751511382032385> Do Not Disturb",
            idle: "<:gidle:671751492557865000> Idle",
            offline: "<:goffline:674039918904999977> Offline"
        }
        // const member: GuildMember = message.guild.members.get(user.id)
        // let clients = Object.keys(member.presence.clientStatus || "None")
        // console.log(message.author.presence.clientStatus)
        let uiembed = new MessageEmbed()
            .setColor("BLUE")
            .setThumbnail(member.user.displayAvatarURL())
            .addField(`Username:`, member.user.username, true)
            .addField(`User ID:`, member.id, true)
            .addField(`User Discriminator:`, member.user.discriminator, true)
            .addField(`User Created:`, member.user.createdAt, true)
            .addField(`User Boosted:`, `${member.premiumSince ? message.member.premiumSince : "Not Boosted"}`, true)
            .addField(`User Joined`, member.joinedAt, true)
            .addField(`User Bot:`, `${member.user.bot ? "Yes" : "No"}`, true)
            .addField("**Join Position**", `\`${message.guild.members.sort((a: any, b: any) => b.joinedAt - a.joinedAt).map(x => x.id).indexOf(member.id) + 1}\``, true)
            // .addField(`User Last Message:`, `[Jump to Message](${member.lastMessage.url || "None"})`, true)
            .addField(`User Nickname`, `${member.nickname || "None"}`, true)
            // .addField(`User Device(s)`, `${clients.map(x => x.slice(0, 1).toUpperCase() + x.slice(1)).join(', ') || "None"}`, true)
            .addField(`User Status Info:`, `**Status**: ${status[member.presence.status]}\n**Activity**: ${member.presence.activities.join(",\n") || "None"}`, true)
            .addField(`User Highest Role:`, member.roles.highest, true)
            .addField(`User Roles: (${member.roles.size - 1})`, member.roles.first(15).filter(f => f.name !== "@everyone").sort((a, b) => b.position - a.position).map(x => x).join(", "))
            .addField(`User Permissions`, `\`\`\`${member.permissions.toArray().join(", ")}\`\`\``)
        message.util.send(uiembed);
    }
}