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

import com.keygenqt.mb.shared.db.entities.*
import org.flywaydb.core.api.migration.BaseJavaMigration
import org.flywaydb.core.api.migration.Context
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

@Suppress("unused", "ClassName")
class V0003__Create_UserDirections : BaseJavaMigration() {
    override fun migrate(context: Context?) {
        transaction {
            SchemaUtils.create(UserDirections)
            initUserDirections()
        }
    }
}

fun initUserDirections() {
    UserDirectionEntity.new {
        this.name = "Android"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }
    UserDirectionEntity.new {
        this.name = "Aurora OS"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }
    UserDirectionEntity.new {
        this.name = "Flutter"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }
    UserDirectionEntity.new {
        this.name = "Kotlin"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }
    UserDirectionEntity.new {
        this.name = "iOS"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
    }
}
