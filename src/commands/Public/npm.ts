import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import fetch from "node-fetch"

export default class NPMCommand extends Command {
    public constructor() {
        super("npm", {
            aliases: ["npm"],
            category: "Public",
            description: {
                content: "Searches for an NPM package",
                examples: [":?npm discord.js"],
                usages: "<package name>"
            },
            args: [{
                id: 'one', type: 'string', match: 'content', default: null,
                prompt: {
                    start: `Please provide a package name`,
                    retry: `Please provide a **valid** package`,
                }
            }],
            ratelimit: 3
        });
    }
    public async exec(message, { one }: { one: string }) {
        let NPMImage = 'https://cdn.discordapp.com/attachments/661364189834772560/662779927971495983/npm.png';

        await fetch(`https://registry.npmjs.com/${one}`)
            .then(res => res.json()).then(body => {
                if (body.name === undefined) return message.util.reply('invalid package name.')
                const embed = new MessageEmbed()
                    .setAuthor(`NPMJS | ${one.replace(/\s+/g, '-')}`, NPMImage)
                    .setThumbnail(NPMImage)
                    .setColor("DARK_BLUE")
                    .addField('Package Name', `\`${body.name}\``, true)
                    .addField('Package Link', `[Click Me](${`https://www.npmjs.com/package/${one}`})`, true)
                    .addField('Package Version', `\`${body['dist-tags'].latest}\``, true)
                    .addField('Package Keywords', `${body.keywords ? body.keywords.map(x => `\`${x}\``).join(', ') : 'None'}`)
                    .addField('Package Description', body.description)
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL())

                return message.util.send({ embed });
            })
    }
}