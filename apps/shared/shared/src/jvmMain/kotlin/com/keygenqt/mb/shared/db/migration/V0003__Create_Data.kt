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
package com.keygenqt.mb.shared.db.migration

import com.keygenqt.mb.shared.db.entities.DirectionEntity
import com.keygenqt.mb.shared.db.entities.ExpertEntity
import com.keygenqt.mb.shared.db.entities.ExpertInfoEntity
import com.keygenqt.mb.shared.db.entities.ExpertsInfo
import com.keygenqt.mb.shared.responses.Localization
import org.flywaydb.core.api.migration.BaseJavaMigration
import org.flywaydb.core.api.migration.Context
import org.jetbrains.exposed.sql.SizedCollection
import org.jetbrains.exposed.sql.transactions.transaction

@Suppress("unused", "ClassName")
class V0003__Create_Data : BaseJavaMigration() {
    override fun migrate(context: Context?) {
        transaction {
            /// Directions
            val directionAndroid = DirectionEntity.new {
                this.name = "Android"
                this.isPublished = true
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionAuroraOS = DirectionEntity.new {
                this.name = "Aurora OS"
                this.isPublished = true
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionFlutter = DirectionEntity.new {
                this.name = "Flutter"
                this.isPublished = true
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionKotlin = DirectionEntity.new {
                this.name = "Kotlin"
                this.isPublished = true
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionIOS = DirectionEntity.new {
                this.name = "iOS"
                this.isPublished = true
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }

            /// Experts
            ExpertEntity.new {
                this.isPublished = true
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.info = SizedCollection(
                    *listOf(
                        ExpertInfoEntity.new {
                            this.fname = "Vitaliy"
                            this.lname = "Zarubin"
                            this.description = "Ведущий разработчик ОМП"
                            this.localization = Localization.EN
                        },
                        ExpertInfoEntity.new {
                            this.fname = "Виталий"
                            this.lname = "Зарубин"
                            this.description = "Lead developer of OMP"
                            this.localization = Localization.RU
                        }
                    ).toTypedArray()
                )
                this.directions = SizedCollection(
                    *listOf(
                        directionAuroraOS,
                        directionFlutter,
                        directionKotlin
                    ).toTypedArray()
                )
            }
        }
    }
}
