/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const ColumnLocaleResponse = shared.com.keygenqt.mb.shared.responses.ColumnLocaleResponse

/**
 * Map [ColumnLocaleResponse] to object
 */
ColumnLocaleResponse.prototype.mapToColumnLocale = function () {
    return {
        text: this.text,
        locale: this.locale.mapToLocale(),
    }
};

/**
 * Ma [ColumnLocaleResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToColumnLocales = function () {
    return this.map((it) => it.mapToColumnLocale())
};
