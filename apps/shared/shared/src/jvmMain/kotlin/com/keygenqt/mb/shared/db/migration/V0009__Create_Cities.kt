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
import com.keygenqt.mb.shared.extension.createFileUpload
import com.keygenqt.mb.shared.responses.Locale
import org.flywaydb.core.api.migration.BaseJavaMigration
import org.flywaydb.core.api.migration.Context
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.SizedCollection
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

@Suppress("unused", "ClassName")
class V0009__Create_Cities : BaseJavaMigration() {
    override fun migrate(context: Context?) {
        transaction {
            SchemaUtils.create(Cities)
            SchemaUtils.create(RelationsCitiesColumnLocales)
            SchemaUtils.create(RelationsCitiesOrganizers)
            SchemaUtils.create(RelationsCitiesUploads)
            initCities()
        }
    }
}

fun initCities() {
    val armenia = CountryEntity.find { Countries.name eq "Армения" }.first()
    val belarus = CountryEntity.find { Countries.name eq "Беларусь" }.first()
    val georgia = CountryEntity.find { Countries.name eq "Грузия" }.first()
    val kazakhstan = CountryEntity.find { Countries.name eq "Казахстан" }.first()
    val kyrgyzstan = CountryEntity.find { Countries.name eq "Кыргызстан" }.first()
    val uae = CountryEntity.find { Countries.name eq "ОАЭ" }.first()
    val russia = CountryEntity.find { Countries.name eq "Россия" }.first()
    val tajikistan = CountryEntity.find { Countries.name eq "Таджикистан" }.first()
    val thailand = CountryEntity.find { Countries.name eq "Тайланд" }.first()
    val turkey = CountryEntity.find { Countries.name eq "Турция" }.first()
    val uzbekistan = CountryEntity.find { Countries.name eq "Узбекистан" }.first()

    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Almaty.jpg".createFileUpload()?.fileName}"
        this.name = "Алматы"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = kazakhstan
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Алматы"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Almaty"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Илья") and (Users.lname eq "Гуля") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Almaty").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Bangkok.jpg".createFileUpload()?.fileName}"
        this.name = "Бангкок"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = thailand
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Бангкок"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Bangkok"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Bangkok").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Barnaul.jpg".createFileUpload()?.fileName}"
        this.name = "Барнаул"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Барнаул"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Barnaul"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Дмитрий") and (Users.lname eq "Цывцын") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Barnaul").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Bishkek.jpg".createFileUpload()?.fileName}"
        this.name = "Бишкек"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = kyrgyzstan
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Бішкек"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Bishkek"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Виктор") and (Users.lname eq "Карпиленко") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Bishkek").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Chelyabinsk.jpg".createFileUpload()?.fileName}"
        this.name = "Челябинск"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Чэлябінск"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Chelyabinsk"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Егор") and (Users.lname eq "Куссенков") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Chelyabinsk").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Dubai.jpg".createFileUpload()?.fileName}"
        this.name = "Дубай"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = uae
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Дубай"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Dubai"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Игорь") and (Users.lname eq "Климов") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Dubai").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Grodno.jpg".createFileUpload()?.fileName}"
        this.name = "Гродно"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = belarus
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Гродна"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Grodno"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Семён") and (Users.lname eq "Каскасиан") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Grodno").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Innopolis.jpg".createFileUpload()?.fileName}"
        this.name = "Иннополис"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Інаполіс"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Innopolis"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Алексей") and (Users.lname eq "Рочев") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Innopolis").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Istanbul.jpg".createFileUpload()?.fileName}"
        this.name = "Стамбул"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = turkey
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Стамбул"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Istanbul"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Istanbul").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Kaliningrad.jpg".createFileUpload()?.fileName}"
        this.name = "Калининград"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Калінінград"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Kaliningrad"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Никита") and (Users.lname eq "Синявин") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Kaliningrad").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Khujand.jpg".createFileUpload()?.fileName}"
        this.name = "Худжанд"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = tajikistan
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Худжанд"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Khujand"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Зафар") and (Users.lname eq "Абдуллоев") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Khujand").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Minsk.jpg".createFileUpload()?.fileName}"
        this.name = "Минск"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = belarus
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Мінск"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Minsk"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Святослав") and (Users.lname eq "Башкевич") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Minsk").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Moscow.jpg".createFileUpload()?.fileName}"
        this.name = "Москва"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Масква"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Moscow"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Олег") and (Users.lname eq "Мысин") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Moscow").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Omsk.jpg".createFileUpload()?.fileName}"
        this.name = "Омск"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Омск"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Omsk"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Максим") and (Users.lname eq "Мищенко") }.first(),
                UserEntity.find { (Users.fname eq "Роман") and (Users.lname eq "Юрченко") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Omsk").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Oryol.jpg".createFileUpload()?.fileName}"
        this.name = "Орел"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Арол"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Oryol"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Александр") and (Users.lname eq "Орлов") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Oryol").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Perm.jpg".createFileUpload()?.fileName}"
        this.name = "Пермь"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Перм"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Perm"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Денис") and (Users.lname eq "Беккер") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Perm").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Phuket.jpg".createFileUpload()?.fileName}"
        this.name = "Пхукет"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = thailand
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Пхукет"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Phuket"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Phuket").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Rostov-on-Don.jpg".createFileUpload()?.fileName}"
        this.name = "Ростов-на-Дону"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Растоў-на-Доне"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Rostov-on-Don"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Александр") and (Users.lname eq "Дейненко") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Rostov-on-Don").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Saint-Petersburg.jpg".createFileUpload()?.fileName}"
        this.name = "Санкт-Петербург"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Санкт-Пецярбург"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Saint-Petersburg"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Александра") and (Users.lname eq "Девятовская") }.first(),
                UserEntity.find { (Users.fname eq "Никита") and (Users.lname eq "Мошкалов") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Saint-Petersburg").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Saransk.jpg".createFileUpload()?.fileName}"
        this.name = "Саранск"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Саранск"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Saransk"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Иван") and (Users.lname eq "Синтюрин") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Saransk").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Saratov.jpg".createFileUpload()?.fileName}"
        this.name = "Саратов"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Саратаў"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Saratov"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Даниил") and (Users.lname eq "Царёв") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Saratov").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Tashkent.jpg".createFileUpload()?.fileName}"
        this.name = "Ташкент"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = uzbekistan
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Ташкент"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Tashkent"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Юнус") and (Users.lname eq "Туйгун") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Tashkent").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Tbilisi.jpg".createFileUpload()?.fileName}"
        this.name = "Тбилиси"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = georgia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Тбілісі"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Tbilisi"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Дарья") and (Users.lname eq "Мандзюк") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Tbilisi").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Tomsk.jpg".createFileUpload()?.fileName}"
        this.name = "Томск"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Томск"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Tomsk"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Симон") and (Users.lname eq "Франциско") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Tomsk").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Tyumen.jpg".createFileUpload()?.fileName}"
        this.name = "Тюмень"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Цюмень"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Tyumen"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Юлия") and (Users.lname eq "Поступинская") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Tyumen").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Ufa.jpg".createFileUpload()?.fileName}"
        this.name = "Уфа"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Уфа"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Ufa"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Резеда") and (Users.lname eq "Филипенко") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Ufa").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Voronezh.jpg".createFileUpload()?.fileName}"
        this.name = "Воронеж"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Варонеж"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Voronezh"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Сергей") and (Users.lname eq "Крайнюков") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Voronezh").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Yekaterinburg.jpg".createFileUpload()?.fileName}"
        this.name = "Екатеринбург"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = russia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Екацярынбург"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Yekaterinburg"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Станислав") and (Users.lname eq "Илин") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Yekaterinburg").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
    CityEntity.new {
        this.image = "/api/uploads/${"data/cities/Yerevan.jpg".createFileUpload()?.fileName}"
        this.name = "Ереван"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.country = armenia
        this.locales = SizedCollection(
            *listOf(
                ColumnLocaleEntity.new {
                    this.text = "Ерэван"
                    this.locale = Locale.BY
                },
                ColumnLocaleEntity.new {
                    this.text = "Yerevan"
                    this.locale = Locale.EN
                },
            ).toTypedArray()
        )
        this.organizers = SizedCollection(
            *listOf(
                UserEntity.find { (Users.fname eq "Генрих") and (Users.lname eq "Арутюнян") }.first()
            ).toTypedArray()
        )
        this.uploads = SizedCollection(
            *(File("data/meetings/Yerevan").listFiles()?.filter { it.isFile }?.mapNotNull {
                it.path.createFileUpload()
            } ?: listOf()).toTypedArray()
        )
    }
}
