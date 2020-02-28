import { Command } from "discord-akairo";
import { Message, MessageEmbed, User, GuildMember } from "discord.js";
// import { colors } from "../../Configuration/Config";

export default class BanCommand extends Command {
    public constructor() {
        super("ban", {
            aliases: ["ban", "b", "banum"],
            category: "Moderation",
            args: [
                {
                    id: "member",
                    type: async (
                        msg: Message,
                        str: string
                    ): Promise<GuildMember | User> => {
                        if (!str) return null;
                        return (
                            msg.mentions.members.first() ||
                            msg.guild.members.get(str) ||
                            (await this.client.users.fetch(str).catch(() => null))
                        );
                    },
                    prompt: {
                        start: `please provide a member to ban`,
                        retry: `please provide a **valid** member to ban`
                    }
                },

                {
                    id: "reason",
                    type: "string",
                    match: "rest",
                    default: "No reason provided."
                }
            ],
            description: {
                content: "Bans a member from the guild",
                usage: "ban [ @member | id ] < reason >"
            },
            clientPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"],
            channel: "guild"
        });
    }

    public async exec(
        message: Message,
        { member, reason }: { member: GuildMember | User; reason: any }
    ): Promise<Message | Message[]> {
        let find = message.guild.members.find(m => m === member);

        if (member.id == message.author.id)
            return message.util.send(
                new MessageEmbed()
                    .setColor(`red`)
                    .setDescription(
                        `:x: You cannot ban yourself!`
                    )
            );

        if (find && !(<GuildMember>member).bannable)
            return message.util.send(
                new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(
                        `:x: I couldn't ban: \`${
                        this.client.users.get(member.id).tag
                        }\` because they are higher/the same rank than me.`
                    )
            );

        if (find && (<GuildMember>member).permissions.has("ADMINISTRATOR"))
            return message.util.send(
                new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(
                        `:x: I couldn't ban: \`${
                        this.client.users.get(member.id).tag
                        }\` because they are an Administrator.`
                    )
            );

        if (
            find &&
            (<GuildMember>member).roles.highest >= message.member.roles.highest
        )
            return message.util.send(
                new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(
                        `:x: You cannot kick someone that is higher/the same rank than you!`
                    )
            );

        try {
            await message.guild.members.ban(member, reason);
            return message.util
                .send(
                    new MessageEmbed()
                        .setColor(`GREEN`)
                        .setDescription(
                            `:white_check_mark: Successfully banned: \`${
                            this.client.users.get(member.id).tag
                            }\` for: \`${reason}\``
                        )
                )
                .then(m => m.delete({ timeout: 15000 }));
        } catch {
            return message.util.send(
                new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(
                        `:x: Couldn't ban: \`${
                        this.client.users.get(member.id).tag
                        }\``
                    )
            );
        }
    }
}