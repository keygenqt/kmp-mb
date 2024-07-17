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
package com.keygenqt.mb.shared.db.service

import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.entities.UserEntity
import com.keygenqt.mb.shared.db.entities.Users
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.responses.UserRole
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.selectAll

class UsersService(
    override val db: DatabaseMysql
) : IService<UsersService> {
    /**
     * Get all Experts
     */
    fun getAllExperts() = Users
        .selectAll()
        .where { Users.role eq UserRole.EXPERT }
        .orderBy(Pair(Users.lname, SortOrder.ASC))
        .map { UserEntity.wrapRow(it) }

    /**
     * Find Expert by id
     */
    fun findByIdExpert(
        id: Int,
        isPublished: Boolean? = null
    ) = UserEntity
        .find { (Users.id eq id) and (Users.role eq UserRole.EXPERT) }
        .firstOrNull()


}
