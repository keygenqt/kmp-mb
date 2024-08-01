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

import com.keygenqt.mb.shared.extension.toUTC
import com.keygenqt.mb.shared.responses.RegOrganizerResponse
import com.keygenqt.mb.shared.responses.RegOrganizerState
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object RegOrganizers : IntIdTable() {
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val why = text("why")
    val experience = text("experience")
    val activity = text("activity")
    val email = varchar("email", 255)
    val emailNotion = varchar("emailNotion", 255)
    val telegram = varchar("telegram", 255)
    val city = varchar("city", 255)
    val country = varchar("country", 255)
    val expectations = text("expectations")
    val note = text("note").nullable()
    val state = enumeration("state", RegOrganizerState::class).default(RegOrganizerState.WAITING)
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

class RegOrganizerEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<RegOrganizerEntity>(RegOrganizers)

    var fname by RegOrganizers.fname
    var lname by RegOrganizers.lname
    var why by RegOrganizers.why
    var experience by RegOrganizers.experience
    var activity by RegOrganizers.activity
    var email by RegOrganizers.email
    var emailNotion by RegOrganizers.emailNotion
    var telegram by RegOrganizers.telegram
    var city by RegOrganizers.city
    var country by RegOrganizers.country
    var expectations by RegOrganizers.expectations
    var note by RegOrganizers.note
    var state by RegOrganizers.state
    var createAt by RegOrganizers.createAt
    var updateAt by RegOrganizers.updateAt
}

/**
 * Convert to [RegOrganizerResponse]
 */
fun RegOrganizerEntity.toResponse() = RegOrganizerResponse(
    id = id.value,
    fname = fname,
    lname = lname,
    why = why,
    experience = experience,
    activity = activity,
    email = email,
    emailNotion = emailNotion,
    telegram = telegram,
    city = city,
    country = country,
    expectations = expectations,
    note = note,
    state = state,
    createAt = createAt.toUTC(),
    updateAt = updateAt.toUTC(),
)

/**
 * Convert to [List]
 */
fun Iterable<RegOrganizerEntity>.toResponses(): List<RegOrganizerResponse> {
    return map { it.toResponse() }
}
