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

import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.entities.*
import com.keygenqt.mb.shared.extension.createFileUpload
import com.keygenqt.mb.shared.extension.toText
import com.keygenqt.mb.shared.responses.ContactTypes
import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.shared.responses.UserMediaTypes
import com.keygenqt.mb.shared.responses.UserRole
import org.flywaydb.core.api.migration.BaseJavaMigration
import org.flywaydb.core.api.migration.Context
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.SizedCollection
import org.jetbrains.exposed.sql.transactions.transaction

@Suppress("unused", "ClassName")
class V0007__Create_Users : BaseJavaMigration() {
    override fun migrate(context: Context?) {
        transaction {
            SchemaUtils.create(Users)
            SchemaUtils.create(RelationsUserDirections)
            SchemaUtils.create(RelationsUserLocales)
            SchemaUtils.create(RelationsUserContacts)
            SchemaUtils.create(RelationsUserMedia)
            initUsers()
        }
    }
}

fun initUsers() {
    val directionAndroid = UserDirectionEntity.find { UserDirections.name eq "Android" }.first()
    val directionAuroraOS = UserDirectionEntity.find { UserDirections.name eq "Aurora OS" }.first()
    val directionFlutter = UserDirectionEntity.find { UserDirections.name eq "Flutter" }.first()
    val directionKotlin = UserDirectionEntity.find { UserDirections.name eq "Kotlin" }.first()
    val directionIOS = UserDirectionEntity.find { UserDirections.name eq "iOS" }.first()

    /// Experts
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Evdokimov.jpeg".createFileUpload()?.fileName}"
        this.fname = "Никита"
        this.lname = "Евдокимов"
        this.about = """
                    Mobile Broadcast User по Android.
                    Никита - ведущий мейнтейнер Kaspresso, автор статей о тестировании на Habr и Medium, а также активный участник разработки Kakao. Под его руководством Kaspresso стал еще популярнее, и в ближайшее время появятся новые фитчи для фреймворка.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAndroid,
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Мікіта"
                    this.lname = "Еўдакімаў"
                    this.about = """
                                Карыстальнік мабільнай трансляцыі на Android.
                                Мікіта - вядучы мэйнтэйнер Kaspresso, аўтар статей аб тэставанні на Habr і Medium, а таксама актыўны ўдзельнік распрацоўкі Kakao. Пад яго кіраўніцтвам Kaspresso стаў яшчэ папулярным, і ў бліжэйшы час з'явяцца новыя фітчы для фрэймворка.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Nikita"
                    this.lname = "Evdokimov"
                    this.about = """
                                Mobile Broadcast User for Android.
                                Nikita is the lead maintainer of Kaspresso, the author of articles about testing on Habr and Medium, and is also an active participant in the development of Kakao. Under his leadership, Kaspresso has become even more popular, and new features for the framework will appear in the near future.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.media = SizedCollection(
            *listOf(
                UserMediaEntity.new {
                    this.link = "https://t.me/medoviy_talks"
                    this.type = UserMediaTypes.TELEGRAM
                },
                UserMediaEntity.new {
                    this.link = "https://github.com/Nikitae57"
                    this.type = UserMediaTypes.GITHUB
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
            UserRole.ADMIN,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Gladkov.jpeg".createFileUpload()?.fileName}"
        this.fname = "Алексей"
        this.lname = "Гладков"
        this.paswd = DatabaseMysql.getDefaultPassword()
        this.about = """
                    Mobile Broadcast User по Android, Aurora и Kotlin Multiplatform.
                    Делает вклад в опенсорс в виде примеров по Kotlin Multiplatform и своей библиотеки, автор нескольких крупнейших в СНГ сообществ по разработке, участвует во всех топовых конференциях, автор популярных статей на Дзене.
                    Постоянный резидент Podlodka Crew, участник ПА конференций Dev Fest Omsk, Podlodka, YaTalks.
                    Со-основатель Mobile Broadcast и автор курса по Kotlin Multiplatform.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAuroraOS,
                directionAndroid,
                directionKotlin
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Аляксей"
                    this.lname = "Гладкоў"
                    this.about = """
                                Mobile Broadcast User па Android, Aurora і Kotlin Multiplatform.
                                Робіць уклад у апенсорс у выглядзе прыкладаў па Kotlin Multiplatform і сваёй бібліятэкі, аўтар некалькіх найбуйных у СНД супольнасцяў па распрацоўцы, удзельнічае ва ўсіх топавых канферэнцыях, аўтар папулярных артыкулаў на Дзене.
                                Пастаянны рэзідэнт Podlodka Crew, удзельнік ПА канферэнцый Dev Fest Omsk, Podlodka, YaTalks.
                                Са-заснавальнік Mobile Broadcast і аўтар курса па Kotlin Multiplatform.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Alexey"
                    this.lname = "Gladkov"
                    this.about = """
                                Mobile Broadcast User for Android, Aurora and Kotlin Multiplatform.
                                He contributes to open source in the form of examples on Kotlin Multiplatform and his library, is the author of several of the largest development communities in the CIS, participates in all top conferences, and is the author of popular articles on Zen.
                                Permanent resident of Podlodka Crew, participant of PA conferences Dev Fest Omsk, Podlodka, YaTalks.
                                Co-founder of Mobile Broadcast and author of the Kotlin Multiplatform course.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.media = SizedCollection(
            *listOf(
                UserMediaEntity.new {
                    this.link = "https://t.me/mobiledevnews"
                    this.type = UserMediaTypes.TELEGRAM
                },
                UserMediaEntity.new {
                    this.link = "https://github.com/AlexGladkov"
                    this.type = UserMediaTypes.GITHUB
                },
                UserMediaEntity.new {
                    this.link = "https://www.youtube.com/@MobileDeveloper"
                    this.type = UserMediaTypes.YOUTUBE
                },
                UserMediaEntity.new {
                    this.link = "https://mobiledeveloper.tech"
                    this.type = UserMediaTypes.SITE
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
            UserRole.EXPERT,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Moshkalov.jpeg".createFileUpload()?.fileName}"
        this.fname = "Никита"
        this.lname = "Мошкалов"
        this.short = "Корпоративный архитектор"
        this.about = """
                    Никита - автор докладов по Аврора, и со-организатор хакатона по созданию приложений для ОС "Аврора".
                    У Никиты более чем 7 лет опыта с использованием Qt, а также статус партнера Открытой Мобильной Платформы, которая непосредственно разрабатывает Аврора OС.
                    Активно популяризирует Mobile Broadcast в качестве администратора сообщества в Санкт-Петербурге, надеемся, что в качестве эксперта он принесёт ещё больше пользы Mobile Broadcast!
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAuroraOS,
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Мікіта"
                    this.lname = "Машкалаў"
                    this.short = "Карпаратыўны архітэктар"
                    this.about = """
                                Мікіта - аўтар дакладаў па Аўрора, і са-арганізатар хакатона па стварэнні прыкладанняў для АС "Аўрора".
                                У Мікіты больш за 7 гадоў вопыту з выкарыстаннем Qt, а таксама статус партнёра Адкрытай Мабільнай Платформы, якая непасрэдна распрацоўвае Аўрора OС.
                                Актыўна папулярызуе Mobile Broadcast у якасці адміністратара супольнасці ў Санкт-Пецярбургу, спадзяемся, што ў якасці эксперта ён прынясе яшчэ больш карысці Mobile Broadcast!
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Nikita"
                    this.lname = "Moshkalov"
                    this.short = "Enterprise Architect"
                    this.about = """
                                Nikita is the author of reports on Aurora, and co-organizer of a hackathon on creating applications for the Aurora OS.
                                Nikita has more than 7 years of experience using Qt, as well as the status of a partner of the Open Mobile Platform, which directly develops Aurora OS.
                                He actively popularizes Mobile Broadcast as a community administrator in St. Petersburg, we hope that as an user he will bring even more benefit to Mobile Broadcast!
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/CLTanuki"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "CLTanuki@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Panov.jpeg".createFileUpload()?.fileName}"
        this.fname = "Алексей"
        this.lname = "Панов"
        this.about = """
                    Алексей занимается Android разработкой с 2015 года, за это время поработал над множеством проектов, несколько раз поменял стек технологий, успел пописать под iOS и опробовать Flutter. Сейчас сконцентрировался на  Kotlin Multiplatform разработке.
                    Нравится изучать новые технологии в мобильной разработке и делиться знаниями с сообществом. Выступал на различных конференциях и YouTube каналах, а также самостоятельно организовывал и проводил митапы в Екатеринбурге.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAndroid,
                directionKotlin
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Аляксей"
                    this.lname = "Паноў"
                    this.about = """
                                Аляксей займаецца Android распрацоўкай з 2015 года, за гэты час папрацаваў над мноствам праектаў, некалькі разоў памяняў стэк тэхналогій, паспеў папісаць пад iOS і апрабаваць Flutter. Цяпер сканцэнтраваўся на Kotlin Multiplatform распрацоўцы.
                                Падабаецца вывучаць новыя тэхналогіі ў мабільнай распрацоўцы і дзяліцца ведамі з супольнасцю. Выступаў на розных канферэнцыях і YouTube каналах, а таксама самастойна арганізоўваў і праводзіў мітапы ў Екацярынбурзе.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Alexey"
                    this.lname = "Panov"
                    this.about = """
                                Alexey has been involved in Android development since 2015, during which time he has worked on many projects, changed the technology stack several times, managed to write under iOS and try out Flutter. Currently concentrated on Kotlin Multiplatform development.
                                I like to learn new technologies in mobile development and share knowledge with the community. He spoke at various conferences and YouTube channels, and also independently organized and conducted meetups in Yekaterinburg.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.media = SizedCollection(
            *listOf(
                UserMediaEntity.new {
                    this.link = "https://t.me/kotlin_adept"
                    this.type = UserMediaTypes.TELEGRAM
                },
                UserMediaEntity.new {
                    this.link = "https://github.com/AJIEKCX"
                    this.type = UserMediaTypes.GITHUB
                },
            ).toTypedArray()
        )

    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Popov.jpeg".createFileUpload()?.fileName}"
        this.fname = "Кирилл"
        this.lname = "Попов"
        this.about = """
                    Кирилл - руководитель направления Android разработки в Одноклассники. Основатель сервиса Tracer.
                    Больше 10 лет в Android разработке. Несколько лет был в составе ПК Mobius и Apps Conf. Регулярно выступает на конференциях по Android разработке.
                    Сфера профессиональных интересов — повышение качества и стабильности приложений.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAndroid,
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Кірыл"
                    this.lname = "Папоў"
                    this.about = """
                                Кірыл - кіраўнік напрамкі Android распрацоўкі ў Аднакласнікі. Заснавальнік сэрвісу Tracer.
                                Больш за 10 гадоў у Android распрацоўцы. Некалькі гадоў быў у складзе ПК Mobius і Apps Conf. Рэгулярна выступае на канферэнцыях па Android распрацоўцы.
                                Сфера прафесійных інтарэсаў - павышэнне якасці і стабільнасці прыкладанняў.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Kirill"
                    this.lname = "Popov"
                    this.about = """
                                Kirill is the head of Android development at Одноклассники. Founder of the Tracer service.
                                More than 10 years in Android development. For several years he was part of PC Mobius and Apps Conf. Regularly speaks at conferences on Android development.
                                Area of professional interests: improving the quality and stability of applications.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Sk1talec"
                    this.type = ContactTypes.TELEGRAM
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
            UserRole.ADMIN,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Rozov.jpeg".createFileUpload()?.fileName}"
        this.fname = "Кирилл"
        this.lname = "Розов"
        this.paswd = DatabaseMysql.getDefaultPassword()
        this.about = """
                    Mobile Broadcast User по Android.
                    Android разработчик с 11+ годами опыта в разработке мобильных приложений. Автор и создатель Android Broadcast - популярных Telegram и YouTube каналов про лучшие практики в Android разработке и последние тренды.
                    Эксперт Kotlin и адепт Kotlin Multiplatform.
                    Staff Software Engineer в Тинькофф. Занимается разработкой клиентов корпоративного мессенджера на Kotlin Multiplatform и Compose Multiplatform.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAndroid,
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Кірыл"
                    this.lname = "Ружак"
                    this.about = """
                                Mobile Broadcast User па Android.
                                Android распрацоўшчык з 11+ гадамі вопыту ў распрацоўцы мабільных прыкладанняў. Аўтар і стваральнік Android Broadcast - папулярных Telegram і YouTube каналаў пра лепшыя практыкі ў Android распрацоўцы і апошнія трэнды.
                                Эксперт Kotlin і прадстаўнік Kotlin Multiplatform.
                                Staff Software Engineer у Тинькофф. Займаецца распрацоўкай кліентаў карпаратыўнага месэнджара на Kotlin Multiplatform і Compose Multiplatform.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Kirill"
                    this.lname = "Rozov"
                    this.about = """
                                Mobile Broadcast User for Android.
                                Android developer with 11+ years of experience in mobile application development. Author and creator of Android Broadcast - popular Telegram and YouTube channels about best practices in Android development and the latest trends.
                                Kotlin user and Kotlin Multiplatform adherent.
                                Staff Software Engineer at Tinkoff. Develops corporate messenger clients on Kotlin Multiplatform and Compose Multiplatform.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://www.linkedin.com/in/kirillrozov/"
                    this.type = ContactTypes.LINKEDIN
                },
            ).toTypedArray()
        )
        this.media = SizedCollection(
            *listOf(
                UserMediaEntity.new {
                    this.link = "https://t.me/rozov_blog"
                    this.type = UserMediaTypes.TELEGRAM
                },
                UserMediaEntity.new {
                    this.link = "https://www.youtube.com/@AndroidBroadcast"
                    this.type = UserMediaTypes.YOUTUBE
                },
                UserMediaEntity.new {
                    this.link = "https://androidbroadcast.dev"
                    this.type = UserMediaTypes.SITE
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
            UserRole.ADMIN,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Zarubin.jpeg".createFileUpload()?.fileName}"
        this.fname = "Виталий"
        this.lname = "Зарубин"
        this.paswd = DatabaseMysql.getDefaultPassword()
        this.quote =
            "Если учить, что учат все, писать код, как все, отдыхать, как все, будешь, как все — заурядной личностью стоящей в очереди за счастьем среди других заурядных личностей."
        this.about = """
                    Mobile Broadcast User по Aurora, Flutter и Kotlin Multiplatform.
                    Ведущий инженер-программист компании "Открытая мобильная платформа" (ОМП).
                    Занимается направлением развития современных кроссплатформенных направлений в ОС Аврора, таких как Flutter и Kotlin Multiplatform. Помогает другим мобильным разработчикам приобщиться к Аврора ОС.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAuroraOS,
                directionFlutter,
                directionKotlin
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Віталь"
                    this.lname = "Зарубін"
                    this.quote =
                        "Калі вучыць, што вучаць усё, пісаць код, як усе, адпачываць, як усе, будзеш, як усе - пасрэднай асобай якая стаіць у чарзе за шчасцем сярод іншых пасрэдных асоб."
                    this.about = """
                                Mobile Broadcast User па Aurora, Flutter і Kotlin Multiplatform.
                                Вядучы інжынер-праграміст кампаніі "Адкрытая мабільная платформа" (ОМП).
                                Займаецца напрамкам развіцця сучасных кросплатформавых напрамкаў у АС Аўрора, такіх як Flutter і Kotlin Multiplatform. Дапамагае іншым мабільным распрацоўшчыкам далучыцца да Аўрора АС.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Vitaliy"
                    this.lname = "Zarubin"
                    this.quote =
                        "If you study what everyone studies, write code like everyone else, relax like everyone else, you will be like everyone else - an ordinary person standing in line for happiness among other ordinary individuals."
                    this.about = """
                                Mobile Broadcast User on Aurora, Flutter and Kotlin Multiplatform.
                                Leading software engineer at Open Mobile Platforms (OMP).
                                He is involved in the development of modern cross-platform areas in the Aurora OS, such as Flutter and Kotlin Multiplatform. Helps other mobile developers to join Aurora OS.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "keygenqt@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
                UserContactEntity.new {
                    this.link = "https://www.linkedin.com/in/vitaliy-zarubin-6a8257150/"
                    this.type = ContactTypes.LINKEDIN
                },
            ).toTypedArray()
        )
        this.media = SizedCollection(
            *listOf(
                UserMediaEntity.new {
                    this.link = "https://t.me/aurora_dev"
                    this.type = UserMediaTypes.TELEGRAM
                },
                UserMediaEntity.new {
                    this.link = "https://github.com/keygenqt"
                    this.type = UserMediaTypes.GITHUB
                },
                UserMediaEntity.new {
                    this.link = "https://www.youtube.com/@user-si5qp1yc9k"
                    this.type = UserMediaTypes.YOUTUBE
                },
                UserMediaEntity.new {
                    this.link = "https://keygenqt.com/"
                    this.type = UserMediaTypes.SITE
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Zharkova.jpeg".createFileUpload()?.fileName}"
        this.fname = "Анна"
        this.lname = "Жаркова"
        this.about = """
                    Mobile Broadcast User по Android, iOS и Kotlin Multiplatform.
                    Руководитель группы разработки Android/iOS в Usetech.
                    Мобильный разработчик с более 9 годами опыта в коммерческой разработке. KMP Developer User. Занимается нативной разработкой iOS (Swift/Objective-С), Android (Kotlin/Java) и кроссплатформенной (KMM, Xamarin).
                    Преподает на курсах «iOS Advanced 2.0» и «iOS Базовый» в Otus. Рассказывает о нативной и кроссплатформенной мобильной разработке, а также про IT в целом в Telegram-канале «Записки разработчицы».
                    Член ПК Mobius, Codefest, Podlodka Android, Android Worldwide. Спикер на конференциях Mobius, Droidcon, Android Worldwide, AppsConf.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionAndroid,
                directionKotlin,
                directionIOS,
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Ганна"
                    this.lname = "Жаркава"
                    this.about = """
                                Mobile Broadcast User па Android, iOS і Kotlin Multiplatform.
                                Кіраўнік групы распрацоўкі Android/iOS у Usetech.
                                Мабільны распрацоўшчык з больш за 9 гадамі вопыту ў камерцыйнай распрацоўцы. KMP Developer User. Займаецца натыўнай распрацоўкай iOS (Swift/Objective-З), Android (Kotlin/Java) і кросплатформавай (KMM, Xamarin).
                                Выкладае на курсах "iOS Advanced 2.0" і "iOS Базавы" у Otus. Распавядае аб натыўнай і кросплатформавай мабільнай распрацоўцы, а таксама пра IT у цэлым у Telegram-канале «Цыдулкі распрацоўніцы».
                                Член ПК Mobius, Codefest, Podlodka Android, Android Worldwide. Спікер на канферэнцыях Mobius, Droidcon, Android Worldwide, AppsConf.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Anna"
                    this.lname = "Zharkova"
                    this.about = """
                                Mobile Broadcast User for Android, iOS and Kotlin Multiplatform.
                                Head of the Android/iOS development team at Usetech.
                                Mobile developer with over 9 years of experience in commercial development. KMP Developer User. Engaged in native iOS (Swift/Objective-C), Android (Kotlin/Java) and cross-platform (KMM, Xamarin) development.
                                Teaches the iOS Advanced 2.0 and iOS Basic courses at Otus. Talks about native and cross-platform mobile development, as well as about IT in general in the Telegram channel “Notes from a Developer”.
                                Member of PC Mobius, Codefest, Podlodka Android, Android Worldwide. Speaker at Mobius, Droidcon, Android Worldwide, AppsConf conferences.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://www.linkedin.com/in/anna-zharkova-56799780/"
                    this.type = ContactTypes.LINKEDIN
                },
            ).toTypedArray()
        )
        this.media = SizedCollection(
            *listOf(
                UserMediaEntity.new {
                    this.link = "https://t.me/prettygeeknote"
                    this.type = UserMediaTypes.TELEGRAM
                },
                UserMediaEntity.new {
                    this.link = "https://github.com/anioutkazharkova"
                    this.type = UserMediaTypes.GITHUB
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.EXPERT,
        ).toText()
        this.image = "/api/uploads/${"data/experts/Zonov.jpeg".createFileUpload()?.fileName}"
        this.fname = "Андрей"
        this.lname = "Зонов"
        this.about = """
                    Mobile Broadcast User по iOS.
                    Автор @ios_broadcast, Staff iOS разработчик в Тинькофф.
                    С 2013 года в промышленной мобильной разработке, 4 года преподавал в ВУЗе, тимлид, архитектор мобильных приложений.
                    Развивает локальное мобильное сообщество в Воронеже, выступает на конференциях, Mobius, CrossConf и др.
                """.trimIndent()
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.directions = SizedCollection(
            *listOf(
                directionIOS
            ).toTypedArray()
        )
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Андрэй"
                    this.lname = "Зонов"
                    this.about = """
                                Mobile Broadcast User па iOS.
                                Аўтар @ios_broadcast, Staff iOS распрацоўшчык у Тинькофф.
                                З 2013 года ў прамысловай мабільнай распрацоўцы, 4 гады выкладаў у ВНУ, тымлід, архітэктар мабільных дадаткаў.
                                Развівае лакальную мабільную супольнасць у Варонежы, выступае на канферэнцыях, Mobius, CrossConf і інш.
                            """.trimIndent()
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Andrey"
                    this.lname = "Zonov"
                    this.about = """
                                Mobile Broadcast User for iOS.
                                Author @ios_broadcast, Staff iOS developer at Tinkoff.
                                Since 2013 in industrial mobile development, taught at a university for 4 years, team lead, mobile application architect.
                                Develops a local mobile community in Voronezh, speaks at conferences, Mobius, CrossConf, etc.
                            """.trimIndent()
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://www.linkedin.com/in/avzonov/"
                    this.type = ContactTypes.LINKEDIN
                },
            ).toTypedArray()
        )
        this.media = SizedCollection(
            *listOf(
                UserMediaEntity.new {
                    this.link = "https://t.me/ios_broadcast"
                    this.type = UserMediaTypes.TELEGRAM
                },
            ).toTypedArray()
        )
    }

    // Organizers
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Abdulloev.jpg".createFileUpload()?.fileName}"
        this.fname = "Зафар"
        this.lname = "Абдуллоев"
        this.short = "Umbrella IT, Android Developer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Зафар"
                    this.lname = "Абдулояў"
                    this.short = "Umbrella IT, Android Developer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Zafar"
                    this.lname = "Abdulloev"
                    this.short = "Umbrella IT, Android Developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/zafar_apk"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "abdullaevzafarchik@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Bashkevich.jpg".createFileUpload()?.fileName}"
        this.fname = "Святослав"
        this.lname = "Башкевич"
        this.short = "Инженер-программист"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Святаслаў"
                    this.lname = "Башкевіч"
                    this.short = "Інжынер-праграміст"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Svyatoslav"
                    this.lname = "Bashkevich"
                    this.short = "Software engineer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/sviat98"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "bashkevich.98@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Becker.jpg".createFileUpload()?.fileName}"
        this.fname = "Денис"
        this.lname = "Беккер"
        this.short = "Fullstack, Flutter"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Дзяніс"
                    this.lname = "Бекер"
                    this.short = "Fullstack, Flutter"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Denis"
                    this.lname = "Becker"
                    this.short = "Fullstack, Flutter"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/denisbekker"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "bekker.dev@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Deinenko.jpg".createFileUpload()?.fileName}"
        this.fname = "Александр"
        this.lname = "Дейненко"
        this.short = "Android | KMP developer & Mentor"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Аляксандр"
                    this.lname = "Дзейненка"
                    this.short = "Android | KMP developer & Mentor"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Alexander"
                    this.lname = "Deinenko"
                    this.short = "Android | KMP developer & Mentor"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Alex_Deko"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "deko.world.project@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Devyatovskaya.jpg".createFileUpload()?.fileName}"
        this.fname = "Александра"
        this.lname = "Девятовская"
        this.short = "Android developer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Аляксандра"
                    this.lname = "Дзевятоўскі"
                    this.short = "Android developer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Alexandra"
                    this.lname = "Devyatovskaya"
                    this.short = "Android developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/lexxsage"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "Alexdevyatovskaya@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Filipenko.jpg".createFileUpload()?.fileName}"
        this.fname = "Резеда"
        this.lname = "Филипенко"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Рэзеда"
                    this.lname = "Філіпенка"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Rezeda"
                    this.lname = "Filipenko"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Rezeda8855"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "Rezedafilipenko@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Francisco.jpg".createFileUpload()?.fileName}"
        this.fname = "Симон"
        this.lname = "Франциско"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Сымон"
                    this.lname = "Францыска"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Simon"
                    this.lname = "Francisco"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/simonfrancisco"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "simonfrancisco69@outlook.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Gulya.jpg".createFileUpload()?.fileName}"
        this.fname = "Илья"
        this.lname = "Гуля"
        this.short = "Staff Mobile Engineer в Qantor"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Ілля"
                    this.lname = "Гуля"
                    this.short = "Staff Mobile Engineer у Qantor"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Ilya"
                    this.lname = "Gulya"
                    this.short = "Staff Mobile Engineer в Qantor"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/ilyagulya"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "ilyagulya@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Harutyunyan.jpg".createFileUpload()?.fileName}"
        this.fname = "Генрих"
        this.lname = "Арутюнян"
        this.short = "Android Developer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Генрых"
                    this.lname = "Аруцюнян"
                    this.short = "Android Developer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Henrikh"
                    this.lname = "Harutyunyan"
                    this.short = "Android Developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/mobilevel"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "henrikhharutyunyan1998@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Ilene.jpg".createFileUpload()?.fileName}"
        this.fname = "Станислав"
        this.lname = "Илин"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Станіслаў"
                    this.lname = "Ілін"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Stanislav"
                    this.lname = "Ilin"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/frezyx"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "youngfrezyx@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Karpilenko.jpg".createFileUpload()?.fileName}"
        this.fname = "Виктор"
        this.lname = "Карпиленко"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Віктар"
                    this.lname = "Карпіленка"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Victor"
                    this.lname = "Karpilenko"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/vityard"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "zdatana@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Kaskasian.jpg".createFileUpload()?.fileName}"
        this.fname = "Семён"
        this.lname = "Каскасиан"
        this.short = "Android Developer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Насенне"
                    this.lname = "Каскасіян"
                    this.short = "Android Developer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Semyon"
                    this.lname = "Kaskasian"
                    this.short = "Android Developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Solo4_4"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "semen.kaskasian@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Klimov.jpg".createFileUpload()?.fileName}"
        this.fname = "Игорь"
        this.lname = "Климов"
        this.short = "Android Software Engineer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Ігар"
                    this.lname = "Клімаў"
                    this.short = "Android Software Engineer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Igor"
                    this.lname = "Klimov"
                    this.short = "Android Software Engineer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Ziggsy"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "7igorklimov7@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Krainyukov.jpg".createFileUpload()?.fileName}"
        this.fname = "Сергей"
        this.lname = "Крайнюков"
        this.short = "Android-разработчик, IT-ONE"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Сяргей"
                    this.lname = "Крайнюкоў"
                    this.short = "Android-распрацоўшчык, IT-ONE"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Sergey"
                    this.lname = "Krainyukov"
                    this.short = "Android developer, IT-ONE"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/SergeiKrai"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "jazz98@mail.ru"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Kussenkov.jpg".createFileUpload()?.fileName}"
        this.fname = "Егор"
        this.lname = "Куссенков"
        this.short = "Android Developer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Ягор"
                    this.lname = "Кусянкоў"
                    this.short = "Android Developer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Egor"
                    this.lname = "Kussenkov"
                    this.short = "Android Developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/vergilius_danteus"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "g-jazzman@yandex.ru"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Mandzyuk.jpg".createFileUpload()?.fileName}"
        this.fname = "Дарья"
        this.lname = "Мандзюк"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Дар'я"
                    this.lname = "Мандзюк"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Daria"
                    this.lname = "Mandzyuk"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Di_broadcast"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "dariacolorso@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Mishchenko.jpg".createFileUpload()?.fileName}"
        this.fname = "Максим"
        this.lname = "Мищенко"
        this.short = "Android-разработчик"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Максім"
                    this.lname = "Мішчанка"
                    this.short = "Android-распрацоўшчык"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Maxim"
                    this.lname = "Mishchenko"
                    this.short = "Android developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/yourCcloseFriend"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "sirmaksim47@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Mysin.jpg".createFileUpload()?.fileName}"
        this.fname = "Олег"
        this.lname = "Мысин"
        this.short = "Android Developer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Алег"
                    this.lname = "Мысін"
                    this.short = "Android Developer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Oleg"
                    this.lname = "Mysin"
                    this.short = "Android Developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Mys_ya"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "7nacu7@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Orlov.jpg".createFileUpload()?.fileName}"
        this.fname = "Александр"
        this.lname = "Орлов"
        this.short = "Android разработчик"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Аляксандр"
                    this.lname = "Арлоў"
                    this.short = "Android распрацоўшчык"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Alexander"
                    this.lname = "Orlov"
                    this.short = "Android developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Aleksandr_Orlov_E"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "79202875363@ya.ru"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Postupinskaya.jpg".createFileUpload()?.fileName}"
        this.fname = "Юлия"
        this.lname = "Поступинская"
        this.short = "Старший Android разработчик SM Lab. Pre Hacker"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Юлія"
                    this.lname = "Паступінская"
                    this.short = "Старэйшы Android распрацоўшчык SM Lab. Pre Hacker"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Julia"
                    this.lname = "Postupinskaya"
                    this.short = "Senior Android developer at SM Lab. Pre Hacker"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/yulka_pentagramma"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "tel961666@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Rochev.jpg".createFileUpload()?.fileName}"
        this.fname = "Алексей"
        this.lname = "Рочев"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Аляксей"
                    this.lname = "Рачоў"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Alexey"
                    this.lname = "Rochev"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/rochev_blog"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "Alexrochevs@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Sintyurin.jpg".createFileUpload()?.fileName}"
        this.fname = "Иван"
        this.lname = "Синтюрин"
        this.short = "Android техлид"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Іван"
                    this.lname = "Сінцюрын"
                    this.short = "Android тэхлід"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Ivan"
                    this.lname = "Sintyurin"
                    this.short = "Android tech lead"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Spinoza0"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "ivan.sintyurin@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Sinyavin.jpg".createFileUpload()?.fileName}"
        this.fname = "Никита"
        this.lname = "Синявин"
        this.short = "BetBoom, Tech Lead/Flutter"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Мікіта"
                    this.lname = "Сінявін"
                    this.short = "BetBoom, Tech Lead/Flutter"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Nikita"
                    this.lname = "Sinyavin"
                    this.short = "BetBoom, Tech Lead/Flutter"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/LesleySin"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "nikandsin@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Tsarev.jpg".createFileUpload()?.fileName}"
        this.fname = "Даниил"
        this.lname = "Царёв"
        this.short = "Ведущий разработчик, Орбита Технологии"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Данііл"
                    this.lname = "Цароў"
                    this.short = "Вядучы распрацоўшчык, Арбіта Тэхналогіі"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Daniil"
                    this.lname = "Tsarev"
                    this.short = "Lead Developer, Orbita Technologies"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Aniosky1"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "aniosky95@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Tsyvtsyn.jpg".createFileUpload()?.fileName}"
        this.fname = "Дмитрий"
        this.lname = "Цывцын"
        this.short = "Android Developer"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Дзмітрый"
                    this.lname = "Цыўцын"
                    this.short = "Android Developer"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Dmitry"
                    this.lname = "Tsyvtsyn"
                    this.short = "Android Developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/dmitry_tsyvtsyn"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "dmitry.kind.2@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Tuigun.jpg".createFileUpload()?.fileName}"
        this.fname = "Юнус"
        this.lname = "Туйгун"
        this.short = "Senior Mobile Developer в Uzum Technologies"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Юнус"
                    this.lname = "Туйгун"
                    this.short = "Senior Mobile Developer у Uzum Technologies"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Yunus"
                    this.lname = "Tuigun"
                    this.short = "Senior Mobile Developer в Uzum Technologies"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/Yunuskhuja"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "t.yunuskhuja@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
    UserEntity.new {
        this.roles = listOf(
            UserRole.ORGANIZER,
        ).toText()
        this.image = "/api/uploads/${"data/organizers/Yurchenko.jpg".createFileUpload()?.fileName}"
        this.fname = "Роман"
        this.lname = "Юрченко"
        this.short = "Flutter-разработчик"
        this.createAt = System.currentTimeMillis()
        this.updateAt = System.currentTimeMillis()
        this.locales = SizedCollection(
            *listOf(
                UserLocaleEntity.new {
                    this.fname = "Раман"
                    this.lname = "Юрчанка"
                    this.short = "Flutter-распрацоўшчык"
                    this.locale = Locale.BY
                },
                UserLocaleEntity.new {
                    this.fname = "Roman"
                    this.lname = "Yurchenko"
                    this.short = "Flutter developer"
                    this.locale = Locale.EN
                }
            ).toTypedArray()
        )
        this.contacts = SizedCollection(
            *listOf(
                UserContactEntity.new {
                    this.link = "https://t.me/faang29"
                    this.type = ContactTypes.TELEGRAM
                },
                UserContactEntity.new {
                    this.link = "rkukoyev@gmail.com"
                    this.type = ContactTypes.EMAIL
                },
            ).toTypedArray()
        )
    }
}
