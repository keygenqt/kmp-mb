package com.keygenqt.mb.extension

import com.keygenqt.mb.interfaces.IdValidate

fun List<IdValidate>.validateIds(db: List<IdValidate>) {
    // Get lists ids
    val idsRequest = filter { it.id !== null }.map { it.id }
    val idsDb = db.map { it.id }
    // Check duplicate types
    if (size != map { it.type }.distinct().size) {
        throw RuntimeException("There should be no duplicate types.")
    }
    // Check duplicate ids
    if (idsRequest.size != idsRequest.distinct().size) {
        throw RuntimeException("There should be no duplicate IDs.")
    }
    // Check left ids
    if (idsRequest.size != idsRequest.filter { idsDb.contains(it) }.size) {
        throw RuntimeException("Found that do not belong to the entity.")
    }
    // Check duplicate new value
    if (db.any { find -> filter { it.id == null }.map { it.type }.contains(find.type) }) {
        throw RuntimeException("Duplicate types were found, you need to specify the Id to update them.")
    }
}
