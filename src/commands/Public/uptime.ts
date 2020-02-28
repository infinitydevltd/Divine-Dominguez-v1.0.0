import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import ms from "ms"

export default class upTimeCommand extends Command {
  public constructor() {
    super("uptime", {
      aliases: ["uptime"],
      category: "Public",
      description: {
        content: "Shows the bot uptime",
        examples: ["uptime"],
        usages: "uptime"
      },
      ratelimit: 3,
      cooldown: 10000,
    });
  }
  public exec(message: Message) {
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

    return message.util.send(new MessageEmbed()
      .setColor('DARK_BLUE')
      .setDescription(`${duration(this.client.uptime)}`));
  }
}