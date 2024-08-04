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

import com.keygenqt.mb.shared.extension.isNotGuest
import com.keygenqt.mb.shared.extension.toUTC
import com.keygenqt.mb.shared.responses.RegPartnerResponse
import com.keygenqt.mb.shared.responses.RegPartnerState
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object RegPartners : IntIdTable() {
    val company = varchar("company", 255)
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val email = varchar("email", 255)
    val telegram = varchar("telegram", 255).nullable()
    val phone = varchar("phone", 255)
    val format = text("format")
    val note = text("note").nullable()
    val state = enumeration("state", RegPartnerState::class).default(RegPartnerState.WAITING)
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

class RegPartnerEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<RegPartnerEntity>(RegPartners)

    var company by RegPartners.company
    var fname by RegPartners.fname
    var lname by RegPartners.lname
    var email by RegPartners.email
    var telegram by RegPartners.telegram
    var phone by RegPartners.phone
    var format by RegPartners.format
    var note by RegPartners.note
    var state by RegPartners.state
    var createAt by RegPartners.createAt
    var updateAt by RegPartners.updateAt
}

/**
 * Convert to [RegPartnerResponse]
 */
fun RegPartnerEntity.toResponse(
    roles: List<UserRole> = listOf(UserRole.GUEST)
) = roles.isNotGuest {
    RegPartnerResponse(
        id = id.value,
        company = company,
        fname = fname,
        lname = lname,
        email = email,
        telegram = telegram,
        phone = phone,
        format = format,
        note = note,
        state = state,
        createAt = createAt.toUTC(),
        updateAt = updateAt.toUTC(),
    )
}

/**
 * Convert to [List]
 */
fun Iterable<RegPartnerEntity>.toResponses(
    roles: List<UserRole> = listOf(UserRole.GUEST)
): List<RegPartnerResponse> {
    return mapNotNull { it.toResponse(roles) }
}
