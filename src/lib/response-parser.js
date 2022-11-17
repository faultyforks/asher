import {Response} from "./Response";

function _json_response_mapper(response) {
    // recusrive function that turns strings into Response objects
    // and returns a json with Response objects
    if (typeof response === 'string') {
        return new Response(response);
    } else if (typeof response === 'object') {
        for (let key in response) {
            response[key] = _json_response_mapper(response[key]);
        }
        return response;
    } else if (Array.isArray(response)) {
        for (let i = 0; i < response.length; i++) {
            response[i] = _json_response_mapper(response[i]);
        }
        return response;
    } else {
        return response;
    }
}

/** responseParser
 * @description This function parses a json file and returns a json with Response objects.
 *
 * @param url
 * @returns {Promise<object>}
 */
export function responseParser(url) {
    return new Promise(async (resolve, reject) => {

        try {
            let res = await fetch(url);
            let data = await res.json();
            data = _json_response_mapper(data);
            resolve(data);
        } catch (e) {
            reject(e);
        }

    });
}