/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UserMediaResponse = shared.com.keygenqt.mb.shared.responses.UserMediaResponse

/**
 * Map [UserMediaResponse] to object
 */
UserMediaResponse.prototype.mapToUserMedia = function () {
    return {
        link: this.link,
        type: this.type.mapToUserMediaType(),
    }
};

/**
 * Ma [UserMediaResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUserMedia = function () {
    return this.map((it) => it.mapToUserMedia())
};
