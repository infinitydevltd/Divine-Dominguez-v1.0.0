import { Listener } from "discord-akairo"

export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }
    public exec(): void {
        console.log(`${this.client.user.tag} is online!`)
        this.client.user.setStatus(`idle`)
        this.client.user.setActivity(`:?help / Custom / Mention | ${this.client.guilds.size} Guilds | Users: ${this.client.users.size}`, { type: "WATCHING" })
    }
}