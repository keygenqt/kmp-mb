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

import com.keygenqt.mb.extension.configure
import com.keygenqt.mb.routing.directions
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json
import com.keygenqt.mb.routing.experts
import com.keygenqt.mb.routing.home
import com.keygenqt.mb.routing.uploads
import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.service.DirectionsService
import com.keygenqt.mb.shared.db.service.UsersService
import com.keygenqt.mb.shared.db.service.UploadsService
import com.keygenqt.mb.shared.utils.LoaderConfig
import com.keygenqt.mb.utils.AppLogger.initAppLogger
import io.ktor.server.plugins.statuspages.*
import org.koin.core.context.startKoin
import org.koin.dsl.module as koinModule

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    with(environment.config) {
        // load config
        val conf = LoaderConfig.loadProperties(this.property("ktor.config.app").getString())

        // init logger
        initAppLogger(conf.getPropOrNull("logger") ?: false)

        // init db app
        val db = DatabaseMysql(
            dbConfig = this.property("ktor.config.dbconfig").getString()
        )

        // init koin
        startKoin {
            printLogger()
            modules(
                koinModule {
                    // app config
                    single { conf }
                    // db services
                    single { DirectionsService(db) }
                    single { UsersService(db) }
                    single { UploadsService(db) }
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

        // catch errors
        install(StatusPages) {
            configure()
        }

        install(Routing) {
            staticResources("/static", "assets")
            home()
            route("/api") {
                directions()
                experts()
                uploads()
            }
        }
    }
}
