import { Command, version } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { inspect } from "util";

export default class EvalCommand extends Command {
    public constructor() {
        super('eval', {
            aliases: ['eval', "e", "evaluate"],
            category: 'Owner',
            description: {
                content: "Evaluates a code",
                examples: [":?eval <code>"],
                usages: "<code>"
            },
            clientPermissions: [],
            userPermissions: [],
            ratelimit: 3,
            ownerOnly: true,
            args: [{
                id: 'code',
                match: 'rest',
            }]
        });
    }

    public exec(message, { code }) {
        if (message.author.id == '473276250815856650' || message.author.id == '540219416726601739') {
            try {
                let hrStart = process.hrtime();
                let toEval = eval(code);
                let hrDiff = process.hrtime(hrStart);
                let typedof = typeof toEval
                const embed = new MessageEmbed()
                    .setTitle(`Executed in: *${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] / 1000000}ms*`)
                    .setColor('DARK_BLUE')
                    .addField(`Output:`, `\`\`\`js\n${toEval.length > 1024 ? 'Too Much Output to Show.' : toEval}\`\`\``)
                    .addField('Input:', `\`\`\`js\n${code.length > 1024 ? 'Too Much Input to show.' : code}\`\`\``)
                    .addField('Typeof', `\`\`\`diff\n- ${typedof}\`\`\``)
                message.util.send({ embed });

            } catch (err) {

                const embed = new MessageEmbed()
                    .setColor(`DARK_BLUE`)
                    .setTitle(`:x: Error While Evaluating`)
                    .addField('Input:', `\`\`\`javascript\n${code.length > 1900 ? 'Too Much Input to show.' : code}\`\`\``)
                    .addField('Outputted Error:', `\`\`\`${err.message}\`\`\``)
                message.util.send({ embed });

            }
        }
    }
}