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
import com.keygenqt.mb.shared.responses.ContactTypes
import com.keygenqt.mb.shared.responses.Localization
import com.keygenqt.mb.shared.responses.UserMediaTypes
import com.keygenqt.mb.shared.responses.UserRole
import org.flywaydb.core.api.migration.BaseJavaMigration
import org.flywaydb.core.api.migration.Context
import org.jetbrains.exposed.sql.SizedCollection
import org.jetbrains.exposed.sql.transactions.transaction

@Suppress("unused", "ClassName")
class V0004__Create_DataUsers : BaseJavaMigration() {
    override fun migrate(context: Context?) {
        transaction {
            /// Directions
            val directionAndroid = UserDirectionEntity.new {
                this.name = "Android"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionAuroraOS = UserDirectionEntity.new {
                this.name = "Aurora OS"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionFlutter = UserDirectionEntity.new {
                this.name = "Flutter"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionKotlin = UserDirectionEntity.new {
                this.name = "Kotlin"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }
            val directionIOS = UserDirectionEntity.new {
                this.name = "iOS"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
            }

            /// Experts
            UserEntity.new {
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Evdokimov.jpeg".createFileUpload()?.fileName}"
                this.fname = "Nikita"
                this.lname = "Evdokimov"
                this.quote = null
                this.description = """
                    Mobile Broadcast User for Android.
                    Nikita is the lead maintainer of Kaspresso, the author of articles about testing on Habr and Medium, and is also an active participant in the development of Kakao. Under his leadership, Kaspresso has become even more popular, and new features for the framework will appear in the near future.
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
                        UserLocalizationEntity.new {
                            this.fname = "Никита"
                            this.lname = "Евдокимов"
                            this.quote = null
                            this.description = """
                                Mobile Broadcast User по Android.
                                Никита - ведущий мейнтейнер Kaspresso, автор статей о тестировании на Habr и Medium, а также активный участник разработки Kakao. Под его руководством Kaspresso стал еще популярнее, и в ближайшее время появятся новые фитчи для фреймворка.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Gladkov.jpeg".createFileUpload()?.fileName}"
                this.fname = "Alexey"
                this.lname = "Gladkov"
                this.quote = null
                this.description = """
                    Mobile Broadcast User for Android, Aurora and Kotlin Multiplatform.
                    He contributes to open source in the form of examples on Kotlin Multiplatform and his library, is the author of several of the largest development communities in the CIS, participates in all top conferences, and is the author of popular articles on Zen.
                    Permanent resident of Podlodka Crew, participant of PA conferences Dev Fest Omsk, Podlodka, YaTalks.
                    Co-founder of Mobile Broadcast and author of the Kotlin Multiplatform course.
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
                        UserLocalizationEntity.new {
                            this.fname = "Алексей"
                            this.lname = "Гладков"
                            this.quote = null
                            this.description = """
                                Mobile Broadcast User по Android, Aurora и Kotlin Multiplatform.
                                Делает вклад в опенсорс в виде примеров по Kotlin Multiplatform и своей библиотеки, автор нескольких крупнейших в СНГ сообществ по разработке, участвует во всех топовых конференциях, автор популярных статей на Дзене.
                                Постоянный резидент Podlodka Crew, участник ПА конференций Dev Fest Omsk, Podlodka, YaTalks.
                                Со-основатель Mobile Broadcast и автор курса по Kotlin Multiplatform.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Moshkalov.jpeg".createFileUpload()?.fileName}"
                this.fname = "Nikita"
                this.lname = "Moshkalov"
                this.quote = null
                this.description = """
                    Nikita is the author of reports on Aurora, and co-organizer of a hackathon on creating applications for the Aurora OS.
                    Nikita has more than 7 years of experience using Qt, as well as the status of a partner of the Open Mobile Platform, which directly develops Aurora OS.
                    He actively popularizes Mobile Broadcast as a community administrator in St. Petersburg, we hope that as an user he will bring even more benefit to Mobile Broadcast!
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
                        UserLocalizationEntity.new {
                            this.fname = "Никита"
                            this.lname = "Мошкалов"
                            this.quote = null
                            this.description = """
                                Никита - автор докладов по Аврора, и со-организатор хакатона по созданию приложений для ОС "Аврора".
                                У Никиты более чем 7 лет опыта с использованием Qt, а также статус партнера Открытой Мобильной Платформы, которая непосредственно разрабатывает Аврора OС.
                                Активно популяризирует Mobile Broadcast в качестве администратора сообщества в Санкт-Петербурге, надеемся, что в качестве эксперта он принесёт ещё больше пользы Mobile Broadcast!
                            """.trimIndent()
                            this.locale = Localization.RU
                        }
                    ).toTypedArray()
                )
                this.media = SizedCollection(
                    *listOf(
                        UserMediaEntity.new {
                            this.link = "https://t.me/CLTanuki"
                            this.type = UserMediaTypes.TELEGRAM
                        },
                    ).toTypedArray()
                )
            }
            UserEntity.new {
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Panov.jpeg".createFileUpload()?.fileName}"
                this.fname = "Alexey"
                this.lname = "Panov"
                this.quote = null
                this.description = """
                    Alexey has been involved in Android development since 2015, during which time he has worked on many projects, changed the technology stack several times, managed to write under iOS and try out Flutter. Currently concentrated on Kotlin Multiplatform development.
                    I like to learn new technologies in mobile development and share knowledge with the community. He spoke at various conferences and YouTube channels, and also independently organized and conducted meetups in Yekaterinburg.
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
                        UserLocalizationEntity.new {
                            this.fname = "Алексей"
                            this.lname = "Панов"
                            this.quote = null
                            this.description = """
                                Алексей занимается Android разработкой с 2015 года, за это время поработал над множеством проектов, несколько раз поменял стек технологий, успел пописать под iOS и опробовать Flutter. Сейчас сконцентрировался на  Kotlin Multiplatform разработке.
                                Нравится изучать новые технологии в мобильной разработке и делиться знаниями с сообществом. Выступал на различных конференциях и YouTube каналах, а также самостоятельно организовывал и проводил митапы в Екатеринбурге.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Popov.jpeg".createFileUpload()?.fileName}"
                this.fname = "Kirill"
                this.lname = "Popov"
                this.quote = null
                this.description = """
                    Kirill is the head of Android development at Одноклассники. Founder of the Tracer service.
                    More than 10 years in Android development. For several years he was part of PC Mobius and Apps Conf. Regularly speaks at conferences on Android development.
                    Area of professional interests: improving the quality and stability of applications.
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
                        UserLocalizationEntity.new {
                            this.fname = "Кирилл"
                            this.lname = "Попов"
                            this.quote = null
                            this.description = """
                                Кирилл - руководитель направления Android разработки в Одноклассники. Основатель сервиса Tracer.
                                Больше 10 лет в Android разработке. Несколько лет был в составе ПК Mobius и Apps Conf. Регулярно выступает на конференциях по Android разработке.
                                Сфера профессиональных интересов — повышение качества и стабильности приложений.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Rozov.jpeg".createFileUpload()?.fileName}"
                this.fname = "Kirill"
                this.lname = "Rozov"
                this.quote = null
                this.description = """
                    Mobile Broadcast User for Android.
                    Android developer with 11+ years of experience in mobile application development. Author and creator of Android Broadcast - popular Telegram and YouTube channels about best practices in Android development and the latest trends.
                    Kotlin user and Kotlin Multiplatform adherent.
                    Staff Software Engineer at Tinkoff. Develops corporate messenger clients on Kotlin Multiplatform and Compose Multiplatform.
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
                        UserLocalizationEntity.new {
                            this.fname = "Кирилл"
                            this.lname = "Розов"
                            this.quote = null
                            this.description = """
                                Mobile Broadcast User по Android.
                                Android разработчик с 11+ годами опыта в разработке мобильных приложений. Автор и создатель Android Broadcast - популярных Telegram и YouTube каналов про лучшие практики в Android разработке и последние тренды.
                                Эксперт Kotlin и адепт Kotlin Multiplatform.
                                Staff Software Engineer в Тинькофф. Занимается разработкой клиентов корпоративного мессенджера на Kotlin Multiplatform и Compose Multiplatform.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Zarubin.jpeg".createFileUpload()?.fileName}"
                this.fname = "Vitaliy"
                this.lname = "Zarubin"
                this.quote =
                    "If you study what everyone studies, write code like everyone else, relax like everyone else, you will be like everyone else - an ordinary person standing in line for happiness among other ordinary individuals."
                this.description = """
                    Mobile Broadcast User on Aurora, Flutter and Kotlin Multiplatform.
                    Leading software engineer at Open Mobile Platforms (OMP).
                    He is involved in the development of modern cross-platform areas in the Aurora OS, such as Flutter and Kotlin Multiplatform. Helps other mobile developers to join Aurora OS.
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
                        UserLocalizationEntity.new {
                            this.fname = "Виталий"
                            this.lname = "Зарубин"
                            this.quote =
                                "Если учить, что учат все, писать код, как все, отдыхать, как все, будешь, как все — заурядной личностью стоящей в очереди за счастьем среди других заурядных личностей."
                            this.description = """
                                Mobile Broadcast User по Aurora, Flutter и Kotlin Multiplatform.
                                Ведущий инженер-программист компании "Открытая мобильная платформа" (ОМП).
                                Занимается направлением развития современных кроссплатформенных направлений в ОС Аврора, таких как Flutter и Kotlin Multiplatform. Помогает другим мобильным разработчикам приобщиться к Аврора ОС.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Zharkova.jpeg".createFileUpload()?.fileName}"
                this.fname = "Anna"
                this.lname = "Zharkova"
                this.quote = null
                this.description = """
                    Mobile Broadcast User for Android, iOS and Kotlin Multiplatform.
                    Head of the Android/iOS development team at Usetech.
                    Mobile developer with over 9 years of experience in commercial development. KMP Developer User. Engaged in native iOS (Swift/Objective-C), Android (Kotlin/Java) and cross-platform (KMM, Xamarin) development.
                    Teaches the iOS Advanced 2.0 and iOS Basic courses at Otus. Talks about native and cross-platform mobile development, as well as about IT in general in the Telegram channel “Notes from a Developer”.
                    Member of PC Mobius, Codefest, Podlodka Android, Android Worldwide. Speaker at Mobius, Droidcon, Android Worldwide, AppsConf conferences.
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
                        UserLocalizationEntity.new {
                            this.fname = "Анна"
                            this.lname = "Жаркова"
                            this.quote = null
                            this.description = """
                                Mobile Broadcast User по Android, iOS и Kotlin Multiplatform.
                                Руководитель группы разработки Android/iOS в Usetech.
                                Мобильный разработчик с более 9 годами опыта в коммерческой разработке. KMP Developer User. Занимается нативной разработкой iOS (Swift/Objective-С), Android (Kotlin/Java) и кроссплатформенной (KMM, Xamarin).
                                Преподает на курсах «iOS Advanced 2.0» и «iOS Базовый» в Otus. Рассказывает о нативной и кроссплатформенной мобильной разработке, а также про IT в целом в Telegram-канале «Записки разработчицы».
                                Член ПК Mobius, Codefest, Podlodka Android, Android Worldwide. Спикер на конференциях Mobius, Droidcon, Android Worldwide, AppsConf.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.EXPERT
                this.image = "/api/uploads/${"data/experts/Zonov.jpeg".createFileUpload()?.fileName}"
                this.fname = "Andrey"
                this.lname = "Zonov"
                this.quote = null
                this.description = """
                    Mobile Broadcast User for iOS.
                    Author @ios_broadcast, Staff iOS developer at Tinkoff.
                    Since 2013 in industrial mobile development, taught at a university for 4 years, team lead, mobile application architect.
                    Develops a local mobile community in Voronezh, speaks at conferences, Mobius, CrossConf, etc.
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
                        UserLocalizationEntity.new {
                            this.fname = "Андрей"
                            this.lname = "Зонов"
                            this.quote = null
                            this.description = """
                                Mobile Broadcast User по iOS.
                                Автор @ios_broadcast, Staff iOS разработчик в Тинькофф.
                                С 2013 года в промышленной мобильной разработке, 4 года преподавал в ВУЗе, тимлид, архитектор мобильных приложений.
                                Развивает локальное мобильное сообщество в Воронеже, выступает на конференциях, Mobius, CrossConf и др.
                            """.trimIndent()
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Abdulloev.jpg".createFileUpload()?.fileName}"
                this.fname = "Zafar"
                this.lname = "Abdulloev"
                this.description = "Umbrella IT, Android Developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Зафар"
                            this.lname = "Абдуллоев"
                            this.description = "Umbrella IT, Android Developer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Bashkevich.jpg".createFileUpload()?.fileName}"
                this.fname = "Svyatoslav"
                this.lname = "Bashkevich"
                this.description = "Software engineer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Святослав"
                            this.lname = "Башкевич"
                            this.description = "Инженер-программист"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Becker.jpg".createFileUpload()?.fileName}"
                this.fname = "Denis"
                this.lname = "Becker"
                this.description = "Fullstack, Flutter"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Денис"
                            this.lname = "Беккер"
                            this.description = "Fullstack, Flutter"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Deinenko.jpg".createFileUpload()?.fileName}"
                this.fname = "Alexander"
                this.lname = "Deinenko"
                this.description = "Android | KMP developer & Mentor"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Александр"
                            this.lname = "Дейненко"
                            this.description = "Android | KMP developer & Mentor"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Devyatovskaya.jpg".createFileUpload()?.fileName}"
                this.fname = "Alexandra"
                this.lname = "Devyatovskaya"
                this.description = "Android developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Александра"
                            this.lname = "Девятовская"
                            this.description = "Android developer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Filipenko.jpg".createFileUpload()?.fileName}"
                this.fname = "Rezeda"
                this.lname = "Filipenko"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Резеда"
                            this.lname = "Филипенко"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Francisco.jpg".createFileUpload()?.fileName}"
                this.fname = "Simon"
                this.lname = "Francisco"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Симон"
                            this.lname = "Франциско"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Gulya.jpg".createFileUpload()?.fileName}"
                this.fname = "Ilya"
                this.lname = "Gulya"
                this.description = "Staff Mobile Engineer в Qantor"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Илья"
                            this.lname = "Гуля"
                            this.description = "Staff Mobile Engineer в Qantor"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Harutyunyan.jpg".createFileUpload()?.fileName}"
                this.fname = "Henrikh"
                this.lname = "Harutyunyan"
                this.description = "Android Developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Генрих"
                            this.lname = "Арутюнян"
                            this.description = "Android Developer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Ilene.jpg".createFileUpload()?.fileName}"
                this.fname = "Stanislav"
                this.lname = "Ilin"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Станислав"
                            this.lname = "Илин"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Karpilenko.jpg".createFileUpload()?.fileName}"
                this.fname = "Victor"
                this.lname = "Karpilenko"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Виктор"
                            this.lname = "Карпиленко"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Kaskasian.jpg".createFileUpload()?.fileName}"
                this.fname = "Semyon"
                this.lname = "Kaskasian"
                this.description = "Android Developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Семён"
                            this.lname = "Каскасиан"
                            this.description = "Android Developer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Klimov.jpg".createFileUpload()?.fileName}"
                this.fname = "Igor"
                this.lname = "Klimov"
                this.description = "Android Software Engineer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Игорь"
                            this.lname = "Климов"
                            this.description = "Android Software Engineer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Krainyukov.jpg".createFileUpload()?.fileName}"
                this.fname = "Sergey"
                this.lname = "Krainyukov"
                this.description = "Android developer, IT-ONE"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Сергей"
                            this.lname = "Крайнюков"
                            this.description = "Android-разработчик, IT-ONE"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Kussenkov.jpg".createFileUpload()?.fileName}"
                this.fname = "Egor"
                this.lname = "Kussenkov"
                this.description = "Android Developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Егор"
                            this.lname = "Куссенков"
                            this.description = "Android Developer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Mandzyuk.jpg".createFileUpload()?.fileName}"
                this.fname = "Daria"
                this.lname = "Mandzyuk"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Дарья"
                            this.lname = "Мандзюк"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Mishchenko.jpg".createFileUpload()?.fileName}"
                this.fname = "Maxim"
                this.lname = "Mishchenko"
                this.description = "Android developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Максим"
                            this.lname = "Мищенко"
                            this.description = "Android-разработчик"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Mysin.jpg".createFileUpload()?.fileName}"
                this.fname = "Oleg"
                this.lname = "Mysin"
                this.description = "Android Developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Олег"
                            this.lname = "Мысин"
                            this.description = "Android Developer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Orlov.jpg".createFileUpload()?.fileName}"
                this.fname = "Alexander"
                this.lname = "Orlov"
                this.description = "Android developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Александр"
                            this.lname = "Орлов"
                            this.description = "Android разработчик"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Postupinskaya.jpg".createFileUpload()?.fileName}"
                this.fname = "Julia"
                this.lname = "Postupinskaya"
                this.description = "Senior Android developer at SM Lab. Pre Hacker"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Юлия"
                            this.lname = "Поступинская"
                            this.description = "Старший Android разработчик SM Lab. Pre Hacker"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Rochev.jpg".createFileUpload()?.fileName}"
                this.fname = "Alexey"
                this.lname = "Rochev"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Алексей"
                            this.lname = "Рочев"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Sintyurin.jpg".createFileUpload()?.fileName}"
                this.fname = "Ivan"
                this.lname = "Sintyurin"
                this.description = "Android tech lead"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Иван"
                            this.lname = "Синтюрин"
                            this.description = "Android техлид"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Sinyavin.jpg".createFileUpload()?.fileName}"
                this.fname = "Nikita"
                this.lname = "Sinyavin"
                this.description = "BetBoom, Tech Lead/Flutter"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Никита"
                            this.lname = "Синявин"
                            this.description = "BetBoom, Tech Lead/Flutter"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Tsarev.jpg".createFileUpload()?.fileName}"
                this.fname = "Daniil"
                this.lname = "Tsarev"
                this.description = "Lead Developer, Orbita Technologies"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Даниил"
                            this.lname = "Царёв"
                            this.description = "Ведущий разработчик, Орбита Технологии"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Tsyvtsyn.jpg".createFileUpload()?.fileName}"
                this.fname = "Dmitry"
                this.lname = "Tsyvtsyn"
                this.description = "Android Developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Дмитрий"
                            this.lname = "Цывцын"
                            this.description = "Android Developer"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Tuigun.jpg".createFileUpload()?.fileName}"
                this.fname = "Yunus"
                this.lname = "Tuigun"
                this.description = "Senior Mobile Developer в Uzum Technologies"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Юнус"
                            this.lname = "Туйгун"
                            this.description = "Senior Mobile Developer в Uzum Technologies"
                            this.locale = Localization.RU
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
                this.role = UserRole.ORGANIZER
                this.image = "/api/uploads/${"data/organizers/Yurchenko.jpg".createFileUpload()?.fileName}"
                this.fname = "Roman"
                this.lname = "Yurchenko"
                this.description = "Flutter developer"
                this.createAt = System.currentTimeMillis()
                this.updateAt = System.currentTimeMillis()
                this.locales = SizedCollection(
                    *listOf(
                        UserLocalizationEntity.new {
                            this.fname = "Роман"
                            this.lname = "Юрченко"
                            this.description = "Flutter-разработчик"
                            this.locale = Localization.RU
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
    }
}
