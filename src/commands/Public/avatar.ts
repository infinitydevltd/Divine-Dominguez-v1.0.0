import { Command } from "discord-akairo";
import { MessageEmbed, Message, User, GuildMember } from "discord.js";

export default class AvatarCommand extends Command {
    public constructor() {
        super("avatar", {
            aliases: ["avatar", "av", "pfp"],
            category: "Public",
            description: {
                content: "Displays your or someone else's avatar",
                examples: [":?avatar Host"],
                usages: "<text>"
            },
            args: [{
                id: 'member', type: 'member', match: 'rest', default: _ => _.member
                // prompt: {
                //     start: `Please provide a user`,
                //     retry: `Please provide a **valid** user`,
                // }
            }],
            ratelimit: 2
        });
    }
    public exec(message: Message, { member }): any {
        let pfp = new MessageEmbed()
            .setTitle(`${member.user.tag}'s Avatar`)
            .setImage(member.user.displayAvatarURL({ size: 2048, dynamic: true }))
        message.util.send(pfp)

    }
}
