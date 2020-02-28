import { Inhibitor } from "discord-akairo";
import { Message } from "discord.js"

export default class BlacklistInhibitor extends Inhibitor {
    public constructor() {
        super("blacklist", {
            reason: "blacklist",
            type: "all"
        });
    }
    public exec(message: Message) {
        const list = this.client.settings.get("global", "user.blacklisted", [])
        return list.includes(message.author.id)
    }
}