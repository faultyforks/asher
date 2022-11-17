/** Interaction
 * @description This class represents an interaction with Asher.
 *
 * @class Interaction
 * @constructor
 * @param {EventHandler} events - The event handler to use.
 * @param {object} locale - The locale to that the program uses.
 *
 * @function* message - Generator function that returns a CallToAction.
 */
export class Interaction {
    constructor(eventHandler, locale) {
        this.eventHandler = eventHandler;
        this.locale = locale;
    }

    *message() {}

};