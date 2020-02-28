import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch"

export default class GithubCommand extends Command {
    public constructor() {
        super("guthub", {
            aliases: ["github"],
            category: "Public",
            description: {
                examples: [":?github Vultrex"],
                usages: "<input>"
            },
            args: [{
                id: 'one', type: 'string', match: "rest",
                prompt: {
                    start: `Please provide an account / organization name`,
                }
            }],
            ratelimit: 2
        });
    }
    public exec(message: Message, { one }: { one: string }): any {
        fetch(`https://api.github.com/users/${one}`)
            .then(res => res.json()).then(body => {
                if (body.message) return message.util.send(`The user: \`${one}\` wasn't found.`);
                let { login, avatar_url, name, id, html_url, repos_url, followers, following, location, created_at, bio } = body;

                const embed = new MessageEmbed()
                    .setColor('DARK_BLUE')
                    .setAuthor(`${login}'s GitHub Account Info`, avatar_url)
                    .setThumbnail(avatar_url)
                    .addField(`**Name**`, name || "Unknown", true)
                    .addField(`**ID**`, id, true)
                    .addField(`**Followers**`, followers || 0, true)
                    .addField(`**Following**`, following || 0, true)
                    .addField(`**Location**`, location || "Unknown", true)
                    .addField(`**Created**`, created_at.toLocaleString('en-GB'), true)
                    .addField(`**Repositories**`, `${repos_url.size || "0"}` , true)
                    .addField(`**Profile / Organization Link:**`, `[CLick ME!](${html_url})`, true)
                    .addField(`**Bio**`, bio || "None", true)
                return message.util.send(embed);
            });
    }
}