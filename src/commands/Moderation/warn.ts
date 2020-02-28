import { Command } from "discord-akairo";
import { Message, MessageEmbed, User, GuildMember } from "discord.js";
import fetch from "node-fetch"
// import { colors } from "../../Util/color"

export default class WarnCommand extends Command {
    public constructor() {
        super("warn", {
            aliases: ["warn"],
            category: "Moderation",
            description: {
                examples: [":?warn @Drifter Mini-modding"],
                usages: "<User> [reason]"
            },
            userPermissions: ["KICK_MEMBERS", "BAN_MEMBERS"],
            args: [
                {
                    id: 'user',
                    type: async (msg: Message, str: string): Promise<User | null> => {
                        return msg.mentions.members.first() || this.client.users.fetch(str).catch(() => null)
                    },
                    prompt: {
                        start: (msg: Message): string => `${msg.author}, you must mention a member you wish to warn!`,
                        retry: (msg: Message): string => `${msg.author}, you must provide a valid member you wish to warn!`
                    }
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest'
                },
            ]
        });
    }
    public exec(message: Message, { reason, user }: { reason: string, user: User }): any {
        // const member: User = message.guild.members.get(user.id)
        let warnembed = new MessageEmbed()
            .setColor("DARK_BLUE")
            .addField(`Action:`, `Warn`, true)
            .addField(`Moderator:`, `\`${message.author.username}\` with ID \`(${message.author.id})\``, true)
            .addField(`Warned User:`, `\`${user.username}\` with ID \`(${user.id})\``, true)
            .addField(`Reason:`, `\`${reason}\``, true)
            .setThumbnail(user.displayAvatarURL())
            .setFooter(`Command Executed by ${message.author.tag}`)
        message.util.send(warnembed)
        user.send(new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Hi, you have been warned in \`${message.guild.name}\` for: \`${reason}\`!`))
    }
}