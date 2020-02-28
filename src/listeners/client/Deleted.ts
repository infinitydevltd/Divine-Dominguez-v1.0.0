import { Listener } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class MessageDeletedListener extends Listener {
    public constructor() {
        super("deleted", {
            emitter: "client",
            category: "Client",
            event: "messageDelete"
        });
    }

    public async exec(message: Message) {
        const delch = this.client.settings.get(message.guild, `config.deletedmsg`, [])
        this.client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            date: Date.now(),
            image: message.attachments.first()
                ? message.attachments.map(img => img.proxyURL)
                : undefined
        });
        // delch.send(new MessageEmbed()
        //     .setColor(`DARK_BLUE`)
        //     .setDescription(`${message.content}`)
        //     .setTitle(`There was a deleted message by ${message.author.tag} in ${message.channel}`))
    }
}