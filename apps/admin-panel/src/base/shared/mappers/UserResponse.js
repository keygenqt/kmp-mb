/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UserResponse = shared.com.keygenqt.mb.shared.responses.UserResponse

/**
 * Map [UserResponse] to object
 */
UserResponse.prototype.mapToUser = function () {
    return {
        id: this.id,
        roles: this.roles?.mapToUserRoles(),
        image: this.image,
        fname: this.fname,
        lname: this.lname,
        short: this.short,
        about: this.about,
        quote: this.quote,
        directions: this.directions?.mapToUserDirections(),
        locales: this.locales?.mapToUserLocales(),
        contacts: this.contacts?.mapToUserContacts(),
        media: this.media?.mapToUserMedia(),
    }
};

/**
 * Ma [UserResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUsers = function () {
    return this.map((it) => it.mapToUser())
};
