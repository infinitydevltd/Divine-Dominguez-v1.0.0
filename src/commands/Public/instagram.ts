import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import fetch from "node-fetch"
import { stripIndents } from "common-tags"

export default class NPMCommand extends Command {
    public constructor() {
        super("instagram", {
            aliases: ["instagram", "gucci"],
            category: "Public",
            description: {
                content: "Searches for an instagram account",
                examples: [":?instagram discord.js"],
                usages: "<accname>"
            },
            args: [{
                id: 'one', type: 'string', match: 'content', default: null,
                prompt: {
                    start: `Please provide an acc name`,
                    retry: `Please provide a **valid** name`,
                }
            }],
            ratelimit: 3
        });
    }
    public async exec(message, { one }: { one: string }) {
        if (!one) {
            return message.reply("Maybe it's useful to actually search for someone...!")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${one}/?__a=1`;

        let res;

        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.reply("I couldn't find that account... :(")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${one}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`);
        message.channel.send(embed);
    }
}