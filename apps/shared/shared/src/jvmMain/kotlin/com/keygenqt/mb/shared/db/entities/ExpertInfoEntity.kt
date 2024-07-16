/*
 * Copyright 2024 Vitaliy Zarubin
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
package com.keygenqt.mb.shared.db.entities

import com.keygenqt.mb.shared.responses.ExpertInfoResponse
import com.keygenqt.mb.shared.responses.ExpertResponse
import com.keygenqt.mb.shared.responses.Localization
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object ExpertsInfo : IntIdTable() {
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val description = text("description")
    val quote = text("quote").nullable()
    val localization = enumeration("localization", Localization::class).default(Localization.EN)
}

class ExpertInfoEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<ExpertInfoEntity>(ExpertsInfo)

    var fname by ExpertsInfo.fname
    var lname by ExpertsInfo.lname
    var description by ExpertsInfo.description
    var quote by ExpertsInfo.quote
    var localization by ExpertsInfo.localization
}

/**
 * Convert to [ExpertResponse]
 */
fun ExpertInfoEntity.toResponse() = ExpertInfoResponse(
    id = id.value,
    fname = fname,
    lname = lname,
    description = description,
    quote = quote,
    locale = localization,
)

/**
 * Convert to [List]
 */
fun Iterable<ExpertInfoEntity>.toResponses(): List<ExpertInfoResponse> {
    return map { it.toResponse() }
}

/**
 * Convert to [ExpertResponse]
 */
fun ExpertInfoEntity.toGuestResponse() = ExpertInfoResponse(
    fname = fname,
    lname = lname,
    description = description,
    quote = quote,
    locale = localization,
)

/**
 * Convert to [List]
 */
fun Iterable<ExpertInfoEntity>.toGuestResponses(): List<ExpertInfoResponse> {
    return map { it.toGuestResponse() }
}
