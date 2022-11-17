/** EventHandler
 * @class EventHandler
 * @constructor
 */
export class EventHandler {
    constructor() {
        this.events = new Map();
    }

    /** _createIfNotExists
     * @description This function creates an event if it doesn't exist.
     *
     * @param event
     * @private
     */
    _createIfNotExists(event) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
    }

    /** addEventListener
     * @description adds event to event map.
     *
     * @param event
     * @param callback
     */
    addEventListener(event, callback) {
        this._createIfNotExists(event);
        this.events.get(event).push(callback);
    }

    /** on
     * @description This function is an alias for addEventListener.
     *
     * @param e
     * @param cb
     */
    on(e, cb) {
        return this.addEventListener(e, cb);
    }

    /** removeEventListener
     * @description removes event from event map.
     *
     * @param event
     * @param callback
     */
    removeEventListener(event, callback) {
        this._createIfNotExists(event);
        this.events.set(event, this.events.get(event).filter((cb) => cb !== callback));
    }

    /** once
     * @description This function adds an event that will be removed after it's called.
     *
     * @param event
     * @param callback
     */
    once(event, callback) {
        this._createIfNotExists(event);
        let cb = (...args) => {
            this.removeEventListener(event, cb);
            callback(...args);
        }
        this.addEventListener(event, cb);
    }

    /** emit
     * @description This function emits an event.
     *
     * @param event
     * @param args
     */
    emit(event, ...args) {
        this._createIfNotExists(event);
        this.events.get(event).forEach((cb) => cb(...args));
        if (this.events.has('*')) this.events.get('*').forEach((cb) => cb(event, ...args));
    }

    /** removeAllListeners
     * @description This function removes all listeners from an event.
     *
     * @param event
     */
    removeAllListeners(event) {
        this._createIfNotExists(event);
        this.events.delete(event);
    }

    /** listenOnAll
     * @description This function listens on all events.
     * @param callback - The callback to call (event, ...args)
     * @returns {void}
     */
    listenOnAll(callback) {
        this.events.set('*', callback);
    }
}