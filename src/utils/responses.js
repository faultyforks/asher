/** getMostUnused
 * @description This function returns the most unused response from a list of responses.
 *
 * @param responses
 * @returns {Response}
 */
export function getMostUnused(responses) {
    return responses.sort((a, b) => {
        return a.used - b.used;
    })[0].message;
}