/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UserContactResponse = shared.com.keygenqt.mb.shared.responses.UserContactResponse

/**
 * Map [UserContactResponse] to object
 */
UserContactResponse.prototype.mapToUserContact = function () {
    return {
        link: this.link,
        type: this.type.mapToContactType(),
    }
};

/**
 * Ma [UserContactResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUserContacts = function () {
    return this.map((it) => it.mapToUserContact())
};
