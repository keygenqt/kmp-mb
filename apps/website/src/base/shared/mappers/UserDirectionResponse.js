/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UserDirectionResponse = shared.com.keygenqt.mb.shared.responses.UserDirectionResponse

/**
 * Map [UserDirectionResponse] to object
 */
UserDirectionResponse.prototype.mapToUserDirection = function () {
    return this.name
};

/**
 * Ma [UserDirectionResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUserDirections = function () {
    return this.map((it) => it.mapToUserDirection())
};
