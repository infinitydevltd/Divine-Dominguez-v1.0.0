import { CommandHandler, ListenerHandler, AkairoClient, InhibitorHandler } from "discord-akairo";
import { Message } from "discord.js";
import { join } from "path";
import { ownersid, defprefix, databaseName } from "../Config";
import { Connection } from "typeorm";
import Database from "../structures/Database";
import SettingsProvider from "../structures/SettingsProvider"
import { Settings } from "../models/Settings";

declare module "discord-akairo" {
    interface AkairoClient {
        inhibitorHandler: InhibitorHandler;
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        config: BotOptions;
        settings: SettingsProvider;
        db: Connection;
        snipes;
    }
}

interface BotOptions {
    token?: string;
    owners?: string | string[];
}

export default class BotClient extends AkairoClient {
    public db!: Connection;
    public settings!: SettingsProvider;
    public snipes = new Map();

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: (msg: Message) => msg.guild ? this.settings.get(msg.guild.id, "config.prefix", defprefix) : defprefix,
        ignorePermissions: ownersid,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        automateCategories: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 1e4,
        ignoreCooldown: ["473276250815856650", "540219416726601739"],
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the command...`,
                modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the command...`,
                timeout: "You took too long, the command has been canceled...",
                ended: "You exceeded the maximum amount of tries, the command has been canceled...",
                retries: 4,
                time: 3e4,
                cancel: `Succesfully canceled the command...`,
            },
            otherwise: ""
        }
    });
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    });
    public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
        directory: join(__dirname, "..", "inhibitors")
    });
    public constructor(config: BotOptions) {
        super({
            ownerID: ownersid,
            disabledEvents: ["TYPING_START"],
            shardCount: 1,
            disableEveryone: true,
        });
        this.config = config;
    }
    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            prrocess: process
        });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();

        this.db = Database.get(databaseName);
        await this.db.connect();
        await this.db.synchronize();

        this.settings = new SettingsProvider(this.db.getRepository(Settings))
        await this.settings.init();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.token);
    }
}