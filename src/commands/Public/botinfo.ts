import { Command, version } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import osutils from "os-utils";
import pidusage from "pidusage"

export default class BotInfoCommand extends Command {
    public constructor() {
        super('botinfo', {
            aliases: ['botinfo', "bi", 'stats'],
            category: 'Public',
            description: {
                content: "Shows the bot info",
                examples: ["stats", "bi"],
                usages: "botinfo"
            },
            ratelimit: 3,
            cooldown: 30000,
            args: [{
                id: 'command',
                type: 'commandAlias',
                match: 'content'
            }]
        });
    }

    public exec(message: Message) {
        // let changes = this.client.settings.get("global", "config.changes", [])
        // if (changes == null) changes = "No Changes Yet...."
        // cpuStat.usagePercent(async function(err, percent, seconds) {
        //     const inf = await envinfo.run({
        //       System: ['OS', 'CPU', 'Memory', 'Shell']
        //     }, { json: true })
        //     let { System } = JSON.parse(inf);
        const startUsage = process.cpuUsage();
        const usage = process.cpuUsage(startUsage);
        function duration(ms) {
            const times = {
                day: Math.floor((ms / (1000 * 60 * 60 * 24))),
                hour: Math.floor((ms / (1000 * 60 * 60)) % 24),
                minute: Math.floor((ms / (1000 * 60)) % 60),
                second: Math.floor((ms / 1000) % 60),
                week: Math.floor((ms / (1000 * 60 * 60 * 24 * 7)))
            };

            let string = '';

            for (const [key, value] of Object.entries(times)) {
                if (value > 0) string += `${value} ${key}${value > 1 ? 's' : ''} `
            }
            return `\`${string}\``
        }
        let biembed = new MessageEmbed()
            .setColor("DARK_RED")
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField(`Bot Name`, `\`${this.client.user.username}\``, true)
            .addField(`Bot Discriminator`, `\`${this.client.user.discriminator}\``, true)
            .addField(`Bot was born at`, `\`${this.client.user.createdAt.toLocaleString(`en-GB`)}\``, true)
            .addField(`Servers`, `\`${this.client.guilds.size}\``, true)
            .addField(`Users`, `\`${this.client.users.size}\``, true)
            .addField(`Channels`, `\`${this.client.channels.size}\``, true)
            .addField(`Emojis`, `\`${this.client.emojis.size}\``, true)
            .addField(`Prefix`, `\`:?\``, true)
            .addField(`Owners`, `\`${["473276250815856650", "540219416726601739"].map(u => this.client.users.get(u).tag).join("\n")}\``, true)
            .addField(`Uptime`, `\`${duration(this.client.uptime)}\``, true)
            .addField(`Memory Usage`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, true)
            .addField(`CPU's Count`, `\`${osutils.cpuCount()}\``, true)
            .addField(`Platform`, `\`${osutils.platform().toUpperCase()}\``, true)
            .addField(`Last Restart`, `\`${this.client.readyAt.toLocaleString('en-UK')}\``, true)
            .addField(`CPU Usage`, `\`${usage.system}%\``, true)
            .addField(`Language`, `\`Typescript\``, true)
            .addField(`NodeJS`, `\`${process.version}\``, true)
            .addField(`Discord-Akairo`, `\`${version}\``, true)
            .addField(`Discord.JS`, `\`v12.0.0-dev\``, true)
            .addField(`Changes`, `\`\`\`Added more Moderation/Miscellaneos Commands...\nUpdated some of the commands\`\`\``)
        message.util.send(biembed)
    }
}
// osutils.cpuUsage(function (v) {

//     console.log("CPU Usage (%) : " + v);
//     const CpuUsage_ = v
// });