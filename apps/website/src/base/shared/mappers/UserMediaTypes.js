/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UserMediaTypes = shared.com.keygenqt.mb.shared.responses.UserMediaTypes

/**
 * Map [UserMediaTypes] to object
 */
UserMediaTypes.prototype.mapToUserMediaType = function () {
    return this.name
};

/**
 * Ma [UserMediaTypes] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUserMediaTypes = function () {
    return this.map((it) => it.mapToUserMediaType())
};
