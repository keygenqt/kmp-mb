/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UserLocaleResponse = shared.com.keygenqt.mb.shared.responses.UserLocaleResponse

/**
 * Map [UserLocaleResponse] to object
 */
UserLocaleResponse.prototype.mapToUserLocale = function () {
    return {
        fname: this.fname,
        lname: this.lname,
        short: this.short,
        about: this.about,
        quote: this.quote,
        locale: this.locale.mapToLocale(),
    }
};

/**
 * Ma [UserLocaleResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUserLocales = function () {
    return this.map((it) => it.mapToUserLocale())
};
