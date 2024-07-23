/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const ContactTypes = shared.com.keygenqt.mb.shared.responses.ContactTypes

/**
 * Map [ContactTypes] to object
 */
ContactTypes.prototype.mapToContactType = function () {
    return this.name
};

/**
 * Ma [ContactTypes] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToContactTypes = function () {
    return this.map((it) => it.mapToContactType())
};
