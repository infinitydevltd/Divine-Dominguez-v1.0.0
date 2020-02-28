import { Listener, Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
// import { colors } from "../../Configuration/Config";

export default class CooldownListener extends Listener {
    public constructor() {
        super("cooldown", {
            emitter: "commandHandler",
            category: "Command",
            event: "cooldown"
        });
    }

    public exec(msg: Message, cmd: Command, remaining): any {
        return msg.util.send(
            new MessageEmbed()
                .setColor(`DARK_RED`)
                .setDescription(
                    `:x: Please wait \`${remaining.toFixed(0) /
                    1000}s\` before using command: \`${cmd}\` again.`
                )
        );
    }
}