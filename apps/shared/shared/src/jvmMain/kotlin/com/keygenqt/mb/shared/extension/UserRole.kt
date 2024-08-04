/*
 * Copyright 2023-2024 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.keygenqt.mb.shared.extension

import com.keygenqt.mb.shared.responses.UserRole

fun <T> List<UserRole>.isNotGuest(callback: () -> T): T? {
    if (!this.contains(UserRole.GUEST)) {
        return callback.invoke()
    }
    return null
}

fun List<UserRole>.toText(): String {
    return joinToString(",") { it.name }
}

fun String.fromTextUserRole(): List<UserRole> {
    return split(",").map { UserRole.valueOf(it) }
}
