/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const Locale = shared.com.keygenqt.mb.shared.responses.Locale

/**
 * Map [Locale] to object
 */
Locale.prototype.mapToLocale = function () {
    return this.name
};

/**
 * Ma [Locale] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToLocales = function () {
    return this.map((it) => it.mapToLocale())
};
