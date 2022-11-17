/** Response
 * @description This class represents a response from Asher.
 */
export class Response {
    constructor(message) {
        self.message = message;
        self.used = 0;
    }

    get message() {
        self.used++;
        return self.message;
    }
}