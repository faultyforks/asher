function getAvailableLocales() {
    return new Promise((resolve, reject) => {
        fetch('./locales/meta.json').then(r => {
            r.json().then(j => {
                resolve(j['available']);
            });
        }).catch(e => {reject(e)});
    });
}

export async function detectLocale() {
    let availableLocales = await getAvailableLocales();
    let preferredLocales = [];

    if (navigator.languages) {
        preferredLocales = navigator.languages;
    } else {
        preferredLocales = ['en_US'];
    }

    for (let i = 0; i < preferredLocales.length; i++) {
        let locale = preferredLocales[i];
        if (availableLocales.includes(locale)) {
            return locale;
        } else {
            let fmt = locale.replaceAll('-', '_');
            if (availableLocales.includes(fmt)) {
                return fmt;
            }
        }
    }
}

/** getLocalMessage
 * @description This function returns a message from the locale.
 *
 * @param locale
 * @param type
 * @param route
 * @returns {string[]}
 */
export function getLocalMessage(locale, route) {
    let split = route.split('.');
    let current = locale;
    for (let i = 0; i < split.length; i++) {
        current = current[split[i]];
    }
    return current || ['Error: No message found.'];
}