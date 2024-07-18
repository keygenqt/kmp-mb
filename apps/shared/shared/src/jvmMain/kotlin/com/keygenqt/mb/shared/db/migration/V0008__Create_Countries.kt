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
import com.keygenqt.mb.shared.responses.Locale
import org.flywaydb.core.api.migration.BaseJavaMigration
import org.flywaydb.core.api.migration.Context
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.SizedCollection
import org.jetbrains.exposed.sql.transactions.transaction

@Suppress("unused", "ClassName")
class V0008__Create_Countries : BaseJavaMigration() {
    override fun migrate(context: Context?) {
        transaction {
            SchemaUtils.create(Countries)
            SchemaUtils.create(RelationsCountriesColumnLocales)
            initCountries()
        }
    }
}

fun initCountries() {
    CountryEntity.new {
        this.name = "Армения"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Арменія"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Armenia"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Беларусь"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Беларусь"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Belarus"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Грузия"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Грузія"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Georgia"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Казахстан"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Казахстан"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Kazakhstan"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Кыргызстан"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Кыргызстан"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Kyrgyzstan"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "ОАЭ"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "ААЭ"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "UAE"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Россия"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Расія"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Russia"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Таджикистан"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Таджыкістан"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Tajikistan"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Тайланд"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Тайланд"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Thailand"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Турция"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Турцыя"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Turkey"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
    CountryEntity.new {
        this.name = "Узбекистан"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Узбекістан"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Uzbekistan"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
    }
}
