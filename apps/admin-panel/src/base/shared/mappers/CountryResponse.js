/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const CountryResponse = shared.com.keygenqt.mb.shared.responses.CountryResponse

/**
 * Map [CountryResponse] to object
 */
CountryResponse.prototype.mapToCountry = function () {
    return {
        id: this.id,
        name: this.name,
        locales: this.locales?.mapToColumnLocales(),
    }
};

/**
 * Ma [CountryResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToCountries = function () {
    return this.map((it) => it.mapToCountry())
};
