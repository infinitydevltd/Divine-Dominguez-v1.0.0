import { Listener, Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
// import { colors } from "../../Configuration/Config";

export default class PermissionListener extends Listener {
    public constructor() {
        super("permissions", {
            emitter: "commandHandler",
            category: "Command",
            event: "missingPermissions"
        });
    }

    public exec(message: Message, command: Command, type: string, missing): any {
        if (missing == "nsfw") {
            return message.util.send(
                new MessageEmbed()
                    .setColor(`DARK_BLUE`)
                    .setDescription(
                        `:x: You need to be in a \`NSFW\` channel to use: \`${command}\``
                    )
            );
        }

        if (type == "client") {
            return message.util.send(
                new MessageEmbed()
                    .setColor(`DARK_BLUE`)
                    .setDescription(
                        `:x: I am missing the permissions: ${this.missingPermissions(
                            missing,
                            message.guild.me
                        )} for the command: \`${command}\``
                    )
            );
        } else if (type == "user") {
            return message.util.send(
                new MessageEmbed()
                    .setColor(`DARK_BLUE`)
                    .setDescription(
                        `:x: You are missing the permissions: ${this.missingPermissions(
                            missing,
                            message.member
                        )} for the command: \`${command}\``
                    )
            );
        }
    }

    missingPermissions(permissions: string[], user: any) {
        const result = user.permissions.missing(permissions).map(
            str =>
                `\`${str
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/\b(\w)/g, char => char.toUpperCase())}\``
        );

        return result.length > 1
            ? `${result.slice(0, -1).join(", ")} and ${result.slice(-1)[0]}`
            : result[0];
    }
}