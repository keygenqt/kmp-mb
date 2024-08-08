/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UserRole = shared.com.keygenqt.mb.shared.responses.UserRole

/**
 * Map [UserRole] to object
 */
UserRole.prototype.mapToUserRole = function () {
    return this.name
};

/**
 * Ma [UserRole] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUserRoles = function () {
    return this.map((it) => it.mapToUserRole())
};
