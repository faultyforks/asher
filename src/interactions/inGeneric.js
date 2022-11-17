import {Interaction} from "./Interaction";
import {getLocalMessage} from "../locales";
import {getMostUnused} from "../utils/responses";
import {CallToAction} from "../lib/CallToAction";

export class inGeneric extends Interaction {
    constructor(eventHandler, locale) {
        super(eventHandler, locale);
    }

    *message() {
        console.log(getLocalMessage(this.locale, 'sayings.introduction'));
        yield new CallToAction(getMostUnused(getLocalMessage(this.locale, 'sayings.introduction')), null, (response) => {
            super.eventHandler.emit("interactionUpdate", inGeneric);
        });
    }
}