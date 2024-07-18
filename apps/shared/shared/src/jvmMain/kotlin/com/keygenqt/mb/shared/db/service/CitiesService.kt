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
import com.keygenqt.mb.shared.db.entities.Cities
import com.keygenqt.mb.shared.db.entities.CityEntity
import com.keygenqt.mb.shared.db.entities.UserDirectionEntity
import com.keygenqt.mb.shared.db.entities.UserDirections
import com.keygenqt.mb.shared.interfaces.IService
import org.jetbrains.exposed.sql.SortOrder

class CitiesService(
    override val db: DatabaseMysql
) : IService<CitiesService> {
    /**
     * Get all entities
     */
    fun getAll() = CityEntity
        .all()
        .orderBy(Pair(Cities.name, SortOrder.ASC))
}
