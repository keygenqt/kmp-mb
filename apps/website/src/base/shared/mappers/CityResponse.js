/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const CityResponse = shared.com.keygenqt.mb.shared.responses.CityResponse

/**
 * Map [CityResponse] to object
 */
CityResponse.prototype.mapToCity = function () {
    return {
        id: this.id,
        image: this.image,
        link: this.link,
        name: this.name,
        country: this.country.mapToCountry(),
        locales: this.locales?.mapToColumnLocales(),
        organizers: this.organizers?.mapToUsers(),
        uploads: this.uploads?.mapToUploads(),
    }
};

/**
 * Ma [CityResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToCities = function () {
    return this.map((it) => it.mapToCity())
};
