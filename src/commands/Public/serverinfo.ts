import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class ServerinfoCommand extends Command {
    public constructor() {
        super("serverinfo", {
            aliases: ["serverinfo", "si"],
            category: "Public",
            description: {
                content: "Shows your server info",
                examples: ["serverinfo"],
                usages: "serverinfo"
            },
            ratelimit: 2
            // args: [{
            //     id: "member",
            //     type: "string"
            // }]
        });
    }
    public exec(message: Message, { text }: { text: number }) {
        let serverBanner = new MessageEmbed()
            .setColor("DARK_BLUE")
            .setImage(message.guild.bannerURL())
        let roles = message.guild.roles.filter(r => r.name !== '@everyone').sort((a, b) => b.position > a.position ? 1 : -1).first(20).map(r => r).join(', ');
        let emojisstatic = `${message.guild.emojis.first(20).filter(e => !e.animated).map(x => x).join(' ') || 'None'}`
        if (message.guild.roles.size > 20) roles += `... 20 / ${message.guild.roles.size - 1}`
        if (message.guild.emojis.size > 20) emojisstatic += `... 20 / ${message.guild.emojis.size}`
        let siembed = new MessageEmbed()
            .setColor("DARK_BLUE")
            .setThumbnail(message.guild.iconURL())
            // .setImage(message.guild.bannerURL({ size: 2048 }))
            .addField(`Server Name:`, message.guild.name, true)
            .addField(`Server ID:`, message.guild.id, true)
            .addField(`Server Created:`, message.guild.createdAt.toLocaleString('en-GB'), true)
            .addField(`Server AFK Channel`, message.guild.afkChannel ? message.guild.afkChannel : "Not Set", true)
            .addField(`Server System Channel (Join/Boost)`, message.guild.systemChannel ? message.guild.systemChannel : "Not Set", true)
            .addField(`Server Owner:`, this.client.users.get(message.guild.ownerID).tag, true)
            .addField(`Server AFK Timeout:`, message.guild.afkTimeout.toString(), true)
            .addField(`Server Verification Level:`, message.guild.verificationLevel, true)
            .addField(`Server Boosts:`, message.guild.premiumSubscriptionCount, true)
            .addField("Server Total / Humans / Bots:", `${message.guild.members.size.toLocaleString()} / ${message.guild.members.filter(member => !member.user.bot).size.toLocaleString()} /  ${message.guild.members.filter(member => member.user.bot).size.toLocaleString()}`, true)
            .addField(`Server Channels: Text / Voice:`, `${message.guild.channels.filter(f => f.type == 'text').size} / ${message.guild.channels.filter(f => f.type == 'voice').size}`, true)
            .addField("Server Region:", `${message.guild.region}`, true)
            .addField(`Server Tier:`, message.guild.premiumTier, true)
            .addField(`Server Partnered:`, `${message.guild.partnered ? "Yes" : "No"}`, true)
            .addField(`Server Vanity URL:`, `${message.guild.vanityURLCode ? message.guild.vanityURLCode : "None"}`, true)
            .addField(`Server Roles: ( ${message.guild.roles.size - 1} )`, roles)
            .addField('Server Emojis', `${emojisstatic}`)
            .addField(`Server Features:`, `\`\`\`${message.guild.features[0] ? message.guild.features.join(", ") : "No Features Achieved!"}\`\`\``)
            .setFooter(`To view server banner type :?serverbanner`)
        message.util.send(siembed)
    }
}