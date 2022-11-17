import {detectLocale} from './locales.js';
import {responseParser} from "./lib/response-parser";
import {EventHandler} from "./lib/EventHandler";
import {CallToAction} from "./lib/CallToAction";
import {inGeneric} from "./interactions/inGeneric";

const INTERACTIONS = {
    GENERIC: inGeneric,
    ASK_SUICIDE: 'ask_suicide',
    ASK_COPING: 'ask_coping',
    ASK_COPING_WORK: 'ask_coping_work',
    EXAMPLE_COPING: 'example_coping',
    COPING_NOFIX: 'coping_nofix'
};

export class Asher {
    static async create() {
        let loc = await detectLocale();
        let locale = await responseParser(`./locales/${loc}.json`);
        return new Asher(locale);
    }
    constructor(locale) {
        this.locale = locale;
        this.triggers = locale['triggers'];
        this.sayings = locale['sayings'];

        this.currentInteraction = new INTERACTIONS.GENERIC(this.events, this.locale);

        this.events = new EventHandler(); // WOW EVENT HANDLER IN THE BROWSER?!?!?!??!?!?!? ~ Didier

        this.events.on("interactionUpdate", (interaction, option) => {
            this.currentInteraction = new interaction(this.events, this.locale);
        });

        this.hearbeat_timer = null;
        this.resetHeartbeat();
    }

    /** resetHeartbeat
     * @description reset heartbeat interval
     *
     * @returns {void}
     */
    resetHeartbeat() {
        this.heartbeat_timer = setInterval(() => {
            // todo
        }, 17 * 1000);
    }

    /** handleMessage
     * @description This function handles a message asynchronously and returns a Response.
     *
     * @returns {void}
     * @param message
     */
    async handleMessage(message) {
        this.resetHeartbeat();
        this.events.emit("rawIncomingMessage", message); // send raw message, DNU

        let m = this.currentInteraction.message().next()

        this.events.emit("message", m);
        return m;
    }
}