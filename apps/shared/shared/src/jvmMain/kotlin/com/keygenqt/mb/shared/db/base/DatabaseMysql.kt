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
package com.keygenqt.mb.shared.db.base

import com.keygenqt.mb.shared.utils.Password
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import kotlinx.coroutines.Dispatchers
import org.flywaydb.core.Flyway
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.slf4j.LoggerFactory
import javax.sql.DataSource

class DatabaseMysql(
    password: String,
    dbconfig: String,
) {
    private var db: Database
    private val log = LoggerFactory.getLogger(this::class.java)

    // Generate default password from configuration file
    // Only the server has access to the configuration
    companion object {
        private lateinit var paswd: String
        fun getDefaultPassword(): String {
            return Password.encode(paswd)
        }
    }

    init {
        // Save password before run db and migrations
        paswd = password
        val dataSource = hikari(dbconfig)
        db = Database.connect(dataSource)
        runFlyway(dataSource)
    }

    private fun hikari(configPath: String): DataSource {
        val config = HikariConfig(configPath).apply {
            driverClassName = "com.mysql.cj.jdbc.Driver"
            validate()
        }
        return HikariDataSource(config)
    }

    private fun runFlyway(datasource: DataSource) {
        val flyway = Flyway.configure()
            .locations("com/keygenqt/mb/shared/db/migration")
            .dataSource(datasource)
            .load()
        try {
            flyway.info()
            flyway.migrate()
        } catch (e: Exception) {
            log.error("Exception running flyway migration", e)
            throw e
        }
        log.info("Flyway migration has finished")
    }

    suspend fun <T> transaction(block: suspend () -> T): T {
        return newSuspendedTransaction(
            context = Dispatchers.IO,
            db = db
        ) { block() }
    }
}
