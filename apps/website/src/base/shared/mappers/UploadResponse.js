/**
 * Map class KMM to object
 */
import shared from "shared";

/**
 * Export class from module
 */
export const UploadResponse = shared.com.keygenqt.mb.shared.responses.UploadResponse

/**
 * Map [UploadResponse] to object
 */
UploadResponse.prototype.mapToUpload = function () {
    return `/api/uploads/${this.fileName}`
};

/**
 * Ma [UploadResponse] array to objects array
 */
// eslint-disable-next-line no-extend-native
Array.prototype.mapToUploads = function () {
    return this.map((it) => it.mapToUpload())
};
