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
import com.keygenqt.mb.shared.responses.RegExpertResponse
import com.keygenqt.mb.shared.responses.RegExpertState
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object RegExperts : IntIdTable() {
    val directionID = reference("directionID", UserDirections)
    val expertID = reference("expertID", Users)
    val why = text("why")
    val fname = varchar("fname", 255)
    val lname = varchar("lname", 255)
    val email = varchar("email", 255)
    val telegram = varchar("telegram", 255)
    val cv = varchar("cv", 255)
    val location = varchar("location", 255)
    val experience = text("experience")
    val contribution = text("contribution")
    val note = text("note").nullable()
    val state = enumeration("state", RegExpertState::class).default(RegExpertState.WAITING)
    val createAt = long("createAt")
    val updateAt = long("updateAt")
}

class RegExpertEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<RegExpertEntity>(RegExperts)

    var directionID by RegExperts.directionID
    var expertID by RegExperts.expertID

    var why by RegExperts.why
    var fname by RegExperts.fname
    var lname by RegExperts.lname
    var email by RegExperts.email
    var telegram by RegExperts.telegram
    var cv by RegExperts.cv
    var location by RegExperts.location
    var experience by RegExperts.experience
    var contribution by RegExperts.contribution
    var note by RegExperts.note
    var state by RegExperts.state
    var createAt by RegExperts.createAt
    var updateAt by RegExperts.updateAt

    var direction by UserDirectionEntity referencedOn RegExperts.directionID
    var expert by UserEntity referencedOn RegExperts.expertID
}

/**
 * Convert to [RegExpertResponse]
 */
fun RegExpertEntity.toResponse() = RegExpertResponse(
    id = id.value,
    why = why,
    fname = fname,
    lname = lname,
    email = email,
    telegram = telegram,
    cv = cv,
    location = location,
    experience = experience,
    contribution = contribution,
    note = note,
    state = state,
    createAt = createAt.toUTC(),
    updateAt = updateAt.toUTC(),
    direction = direction.toResponse(),
    expert = expert.toResponse(),
)

/**
 * Convert to [List]
 */
fun Iterable<RegExpertEntity>.toResponses(): List<RegExpertResponse> {
    return map { it.toResponse() }
}
