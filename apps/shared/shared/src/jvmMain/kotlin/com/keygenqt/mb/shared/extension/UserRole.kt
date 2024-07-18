package com.keygenqt.mb.shared.extension

import com.keygenqt.mb.shared.responses.UserRole

fun List<UserRole>.toText(): String {
    return joinToString(",") { it.name }
}

fun String.fromTextUserRole(): List<UserRole> {
    return split(",").map { UserRole.valueOf(it) }
}
