/** CallToAction
 * @description This class represents a call to action from Asher.
 *
 * @class CallToAction
 * @constructor
 * @param {string} message - The message to display to the user.
 * @param {string[]} options - The options to display to the user.
 * @param {function} callback - The callback to call when the user responds with the option as parameter.
 */
export class CallToAction {
    constructor(message, options, callback) {
        this.message = message;
        this.options = options;
        this.callback = callback;
    }
}