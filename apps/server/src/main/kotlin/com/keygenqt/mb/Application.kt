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
package com.keygenqt.mb

import com.keygenqt.mb.base.SessionService
import com.keygenqt.mb.extension.auth
import com.keygenqt.mb.extension.configure
import com.keygenqt.mb.extension.session
import com.keygenqt.mb.routing.*
import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.service.*
import com.keygenqt.mb.utils.AppLogger.initAppLogger
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import org.koin.core.context.startKoin
import org.koin.dsl.module as koinModule


fun main(args: Array<String>) {
    embeddedServer(Netty, commandLineEnvironment(args)).start(wait = true)
}

fun Application.module() {
    with(environment.config) {
        val debug = propertyOrNull("ktor.development")?.getString() == "true"
        val jdbcUrl = propertyOrNull("ktor.application.jdbcUrl")!!.getString()
        val dbUsername = propertyOrNull("ktor.application.dbUsername")!!.getString()
        val dbPassword = propertyOrNull("ktor.application.dbPassword")!!.getString()
        val defaultUserPassword = propertyOrNull("ktor.application.defaultUserPassword")!!.getString()
        val secretSession = propertyOrNull("ktor.secrets.session")!!.getString()
        val secretSignKey = propertyOrNull("ktor.secrets.signKey")!!.getString()

        // init logger
        initAppLogger(debug)

        // init db app
        val db = DatabaseMysql(
            jdbcUrl = jdbcUrl,
            dbUsername = dbUsername,
            dbPassword = dbPassword,
            defaultUserPassword = defaultUserPassword,
        )

        // init koin
        startKoin {
            printLogger()
            modules(
                koinModule {
                    single { DirectionsService(db) }
                    single { UsersService(db) }
                    single { CitiesService(db) }
                    single { CountriesService(db) }
                    single { UploadsService(db) }
                    single { RegExpertsService(db) }
                    single { RegOrganizersService(db) }
                    single { RegPartnersService(db) }
                    single { ColumnLocalesService(db) }
                    single { SessionService(db, secretSession) }
                }
            )
        }

        // init json
        install(ContentNegotiation) {
            json(
                Json {
                    prettyPrint = true
                    isLenient = true
                    ignoreUnknownKeys = true
                    coerceInputValues = true
                }
            )
        }

        // init session
        install(Sessions) {
            session(
                secret = secretSession,
                signKey = secretSignKey
            )
        }

        // init auth
        install(Authentication) {
            auth()
        }

        // catch errors
        install(StatusPages) {
            configure()
        }

        install(Routing) {
            staticResources("/static", "assets")
            home()
            route("/api") {
                login()
                logout()
                directions()
                experts()
                countries()
                cities()
                uploads()
                registrationExperts()
                registrationOrganizers()
                registrationPartners()
            }
        }
    }
}
