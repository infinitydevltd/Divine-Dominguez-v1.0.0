import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildChannel } from "discord.js";
// import { colors } from "../../Configuration/Config";

export default class SnipeCommand extends Command {
    public constructor() {
        super("snipe", {
            aliases: ["snipe", "snipeum"],
            category: "Moderation",
            args: [
                {
                    id: "channel",
                    type: "channel",
                    default: _ => _.channel
                }
            ],
            description: {
                content: "Views the last deleted message in the channel",
                usage: "snipe < #channel | id | name >"
            },
            clientPermissions: ["EMBED_LINKS"],
            userPermissions: ["MANAGE_MESSAGES"],
            channel: "guild"
        });
    }

    public async exec(
        message: Message,
        { channel }: { channel: GuildChannel }
    ): Promise<Message | Message[]> {

        let msg = await this.client.snipes.get(channel.id);
        if (!msg)
            return message.util.send(
                new MessageEmbed()
                    .setColor(`DARK_BLUE`)
                    .setDescription(
                        `:x: There is no recently deleted messages in: ${channel}`
                    )
            );

        const embed = new MessageEmbed()
            .setColor(`DARK_BLUE`)
            .setAuthor(
                `Deleted Message | ${msg.author.tag}`,
                msg.author.displayAvatarURL()
            )
            .setTitle(
                `#${channel.name} | ${new Date(msg.date).toLocaleString("en-US")}`
            );

        if (msg.image) embed.attachFiles(msg.image);
        if (msg.content)
            embed.setDescription(
                `\`\`${
                msg.content.length > 1900
                    ? `${msg.content.substr(0, 1900)}...`
                    : msg.content
                }\`\``
            );

        return message.util.send({ embed });
    }
}