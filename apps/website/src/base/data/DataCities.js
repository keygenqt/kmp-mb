/**
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

import {DataImages} from '..';

export const DataCities = [
    {
        id: 1,
        en: 'Almaty',
        ru: 'Алматы',
        country_en: 'Kazakhstan',
        country_ru: 'Казахстан',
        image: DataImages.community.cities.Almaty,
        images: DataImages.community.meetings.Almaty,
        telegram: 'https://t.me/+fRX-4bLlJwE2ZjNi',
        organizers: [
            {
                id: 1,
                image: DataImages.community.admins.ilyagulya,
                name: 'Илья Гуля',
                about: 'Staff Mobile Engineer в Qantor',
                telegram: 'https://t.me/ilyagulya',
                email: 'ilyagulya@gmail.com',
            }
        ],
    },
    {
        id: 2,
        en: 'Bangkok',
        ru: 'Бангкок',
        country_en: 'Thailand',
        country_ru: 'Тайланд',
        image: DataImages.community.cities.Bangkok,
        images: DataImages.community.meetings.Bangkok,
        telegram: 'https://t.me/+waJtVA6b15MwYTVi',
        organizers: [],
    },
    {
        id: 3,
        en: 'Barnaul',
        ru: 'Барнаул',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Barnaul,
        images: [],
        telegram: 'https://t.me/+5xdJ2xYhNAs1ZDJi',
        organizers: [
            {
                id: 2,
                image: DataImages.community.admins.dmitry_kind_2,
                name: 'Дмитрий Цывцын',
                about: 'Android Developer',
                telegram: 'https://t.me/dmitry_tsyvtsyn',
                email: 'dmitry.kind.2@gmail.com',
            }
        ],
    },
    {
        id: 4,
        en: 'Bishkek',
        ru: 'Бишкек',
        country_en: 'Kyrgyzstan',
        country_ru: 'Кыргызстан',
        image: DataImages.community.cities.Bishkek,
        images: [],
        telegram: 'https://t.me/+sCEQqYFCoa9hNjk6',
        organizers: [
            {
                id: 3,
                image: DataImages.community.admins.zdatana,
                name: 'Карпиленко Виктор',
                about: undefined,
                telegram: 'https://t.me/vityard',
                email: 'zdatana@gmail.com',
            }
        ],
    },
    {
        id: 5,
        en: 'Chelyabinsk',
        ru: 'Челябинск',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Chelyabinsk,
        images: DataImages.community.meetings.Chelyabinsk,
        telegram: 'https://t.me/+dLM-Gvr_KEtlOTIy',
        organizers: [
            {
                id: 4,
                image: DataImages.community.admins.g_jazzman,
                name: 'Егор Куссенков',
                about: 'Android Developer',
                telegram: 'https://t.me/vergilius_danteus',
                email: 'g-jazzman@yandex.ru',
            }
        ],
    },
    {
        id: 6,
        en: 'Dubai',
        ru: 'Дубай',
        country_en: 'UAE',
        country_ru: 'ОАЭ',
        image: DataImages.community.cities.Dubai,
        images: DataImages.community.meetings.Dubai,
        telegram: 'https://t.me/+Ovm9HwrXY7tlN2Vi',
        organizers: [
            {
                id: 5,
                image: DataImages.community.admins.igorklimov7,
                name: 'Климов Игорь',
                about: 'Android Software Engineer',
                telegram: 'https://t.me/Ziggsy',
                email: '7igorklimov7@gmail.com',
            }
        ],
    },
    {
        id: 7,
        en: 'Grodno',
        ru: 'Гродно',
        country_en: 'Belarus',
        country_ru: 'Беларусь',
        image: DataImages.community.cities.Grodno,
        images: DataImages.community.meetings.Grodno,
        telegram: 'https://t.me/+BNCeKxe9fNY1ZmZi',
        organizers: [
            {
                id: 6,
                image: DataImages.community.admins.semen_kaskasian,
                name: 'Каскасиан Семён',
                about: 'Android Developer',
                telegram: 'https://t.me/Solo4_4',
                email: 'semen.kaskasian@gmail.com',
            }
        ],
    },
    {
        id: 8,
        en: 'Innopolis',
        ru: 'Иннополис',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Innopolis,
        images: DataImages.community.meetings.Innopolis,
        telegram: 'https://t.me/+Ei2RO-JG-zA0NDky',
        organizers: [
            {
                id: 7,
                image: DataImages.community.admins.Alexrochevs,
                name: 'Алексей Рочев',
                about: undefined,
                telegram: 'https://t.me/rochev_blog',
                email: 'Alexrochevs@gmail.com',
            }
        ],
    },
    {
        id: 9,
        en: 'Istanbul',
        ru: 'Стамбул',
        country_en: 'Turkiye',
        country_ru: 'Турция',
        image: DataImages.community.cities.Istanbul,
        images: DataImages.community.meetings.Istanbul,
        telegram: 'https://t.me/+4EgRvRNlQ_k3ODNi',
        organizers: [],
    },
    {
        id: 10,
        en: 'Kaliningrad',
        ru: 'Калининград',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Kaliningrad,
        images: DataImages.community.meetings.Kaliningrad,
        telegram: 'https://t.me/+F9KGS7uqcOA4YzQy',
        organizers: [
            {
                id: 8,
                image: DataImages.community.admins.nikandsin,
                name: 'Никита Синявин',
                about: 'BetBoom, Tech Lead/Flutter',
                telegram: 'https://t.me/LesleySin',
                email: 'nikandsin@gmail.com',
            }
        ],
    },
    {
        id: 11,
        en: 'Khujand',
        ru: 'Худжанд',
        country_en: 'Tajikistan',
        country_ru: 'Таджикистан',
        image: DataImages.community.cities.Khujand,
        images: DataImages.community.meetings.Khujand,
        telegram: 'https://t.me/+eD1KD0KqQRZmYWIy',
        organizers: [
            {
                id: 9,
                image: DataImages.community.admins.abdullaevzafarchik,
                name: 'Зафар Абдуллоев',
                about: 'Umbrella IT, Android Developer',
                telegram: 'https://t.me/zafar_apk',
                email: 'abdullaevzafarchik@gmail.com',
            }
        ],
    },
    {
        id: 12,
        en: 'Minsk',
        ru: 'Минск',
        country_en: 'Belarus',
        country_ru: 'Беларусь',
        image: DataImages.community.cities.Minsk,
        images: DataImages.community.meetings.Minsk,
        telegram: 'https://t.me/+pulQ0CrpIokzMjgy',
        organizers: [
            {
                id: 10,
                image: DataImages.community.admins.bashkevich,
                name: 'Святослав Башкевич',
                about: 'Инженер-программист',
                telegram: 'https://t.me/sviat98',
                email: 'bashkevich.98@gmail.com',
            }
        ],
    },
    {
        id: 13,
        en: 'Moscow',
        ru: 'Москва',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Moscow,
        images: DataImages.community.meetings.Moscow,
        telegram: 'https://t.me/+BdVoIS5e3hFmM2Ri',
        organizers: [
            {
                id: 11,
                image: DataImages.community.admins.nacu7,
                name: 'Мысин Олег',
                about: 'Android Developer',
                telegram: 'https://t.me/Mys_ya',
                email: '7nacu7@gmail.com',
            }
        ],
    },
    {
        id: 14,
        en: 'Omsk',
        ru: 'Омск',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Omsk,
        images: DataImages.community.meetings.Omsk,
        telegram: 'https://t.me/+n-nd6GJW1v8xMmVi',
        organizers: [
            {
                id: 12,
                image: DataImages.community.admins.sirmaksim47,
                name: 'Максим Мищенко',
                about: 'Android-разработчик',
                telegram: 'https://t.me/yourCcloseFriend',
                email: 'sirmaksim47@gmail.com',
            },
            {
                id: 13,
                image: DataImages.community.admins.rkukoyev,
                name: 'Роман Юрченко',
                about: 'Flutter-разработчик',
                telegram: 'https://t.me/faang29',
                email: 'rkukoyev@gmail.com',
            }
        ],
    },
    {
        id: 15,
        en: 'Oryol',
        ru: 'Орел',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Oryol,
        images: DataImages.community.meetings.Oryol,
        telegram: 'https://t.me/+0DRIhOWGJBM4Nzky',
        organizers: [
            {
                id: 14,
                image: DataImages.community.admins.a79202875363,
                name: 'Александр Орлов',
                about: 'Android разработчик',
                telegram: 'https://t.me/Aleksandr_Orlov_E',
                email: '79202875363@ya.ru',
            }
        ],
    },
    {
        id: 16,
        en: 'Perm',
        ru: 'Пермь',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Perm,
        images: [],
        telegram: 'https://t.me/+ixklyR4pH640NjU6',
        organizers: [
            {
                id: 15,
                image: DataImages.community.admins.bekker_dev,
                name: 'Денис Беккер',
                about: 'Fullstack, Flutter',
                telegram: 'https://t.me/denisbekker',
                email: 'bekker.dev@gmail.com',
            }
        ],
    },
    {
        id: 17,
        en: 'Phuket',
        ru: 'Пхукет',
        country_en: 'Thailand',
        country_ru: 'Тайланд',
        image: DataImages.community.cities.Phuket,
        images: DataImages.community.meetings.Phuket,
        telegram: 'https://t.me/+lkSV2vCiDVUwYjMy',
        organizers: [],
    },
    {
        id: 18,
        en: 'Rostov-on-Don',
        ru: 'Ростов-на-Дону',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Rostov,
        images: DataImages.community.meetings.Rostov,
        telegram: 'https://t.me/+2DdkcZ2NNhU3MjZi',
        organizers: [
            {
                id: 16,
                image: DataImages.community.admins.deko_world_project,
                name: 'Александр Дейненко',
                about: 'Android | KMP developer & Mentor',
                telegram: 'https://t.me/Alex_Deko',
                email: 'deko.world.project@gmail.com',
            }
        ],
    },
    {
        id: 19,
        en: 'Saint Petersburg',
        ru: 'Санкт-Петербург',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Saint,
        images: DataImages.community.meetings.Saint,
        telegram: 'https://t.me/+7_MHbdAchFljNjFi',
        organizers: [
            {
                id: 17,
                image: DataImages.community.admins.Alexdevyatovskaya,
                name: 'Александра Девятовская',
                about: 'Android developer',
                telegram: 'https://t.me/lexxsage',
                email: 'Alexdevyatovskaya@gmail.com',
            },
            {
                id: 18,
                image: DataImages.community.admins.CLTanuki,
                name: 'Никита\nМошкалов',
                about: 'Корпоративный архитектор',
                telegram: 'https://t.me/CLTanuki',
                email: 'CLTanuki@gmail.com',
            }
        ],
    },
    {
        id: 20,
        en: 'Saransk',
        ru: 'Саранск',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Saransk,
        images: [],
        telegram: 'https://t.me/+VmvEJ86sdMExYzIy',
        organizers: [
            {
                id: 19,
                image: DataImages.community.admins.ivan_sintyurin,
                name: 'Иван Синтюрин',
                about: 'Android техлид',
                telegram: 'https://t.me/Spinoza0',
                email: 'ivan.sintyurin@gmail.com',
            }
        ],
    },
    {
        id: 21,
        en: 'Saratov',
        ru: 'Саратов',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Saratov,
        images: DataImages.community.meetings.Saratov,
        telegram: 'https://t.me/+8JXL_yV08i9kODQy',
        organizers: [
            {
                id: 20,
                image: DataImages.community.admins.aniosky95,
                name: 'Царёв Даниил',
                about: 'Ведущий разработчик, Орбита Технологии',
                telegram: 'https://t.me/Aniosky1',
                email: 'aniosky95@gmail.com',
            }
        ],
    },
    {
        id: 22,
        en: 'Tashkent',
        ru: 'Ташкент',
        country_en: 'Uzbekistan',
        country_ru: 'Узбекистан',
        image: DataImages.community.cities.Tashkent,
        images: DataImages.community.meetings.Tashkent,
        telegram: 'https://t.me/+2EXJK3MBLt43ZDQy',
        organizers: [
            {
                id: 21,
                image: DataImages.community.admins.t_yunuskhuja,
                name: 'Юнус Туйгун',
                about: 'Senior Mobile Developer в Uzum Technologies',
                telegram: 'https://t.me/Yunuskhuja',
                email: 't.yunuskhuja@gmail.com',
            }
        ],
    },
    {
        id: 23,
        en: 'Tbilisi',
        ru: 'Тбилиси',
        country_en: 'Georgia',
        country_ru: 'Грузия',
        image: DataImages.community.cities.Tbilisi,
        images: DataImages.community.meetings.Tbilisi,
        telegram: 'https://t.me/+wbTHqJMLEhtmNzAy',
        organizers: [
            {
                id: 22,
                image: DataImages.community.admins.dariacolorso,
                name: 'Дарья Мандзюк',
                about: undefined,
                telegram: 'https://t.me/Di_broadcast',
                email: 'dariacolorso@gmail.com',
            }
        ],
    },
    {
        id: 24,
        en: 'Tomsk',
        ru: 'Томск',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Tomsk,
        images: DataImages.community.meetings.Tomsk,
        telegram: 'https://t.me/+twXa448iYR80MTIy',
        organizers: [
            {
                id: 23,
                image: DataImages.community.admins.simonfrancisco69,
                name: 'Симон Франциско',
                about: undefined,
                telegram: 'https://t.me/simonfrancisco',
                email: 'simonfrancisco69@outlook.com',
            }
        ],
    },
    {
        id: 25,
        en: 'Tyumen',
        ru: 'Тюмень',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Tyumen,
        images: DataImages.community.meetings.Tyumen,
        telegram: 'https://t.me/+tayi6NrmXKAyYjBi',
        organizers: [
            {
                id: 24,
                image: DataImages.community.admins.tel961666,
                name: 'Поступинская Юлия',
                about: 'Старший Android разработчик SM Lab. Pre Hacker',
                telegram: 'https://t.me/yulka_pentagramma',
                email: 'tel961666@gmail.com',
            }
        ],
    },
    {
        id: 26,
        en: 'Ufa',
        ru: 'Уфа',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Ufa,
        images: DataImages.community.meetings.Ufa,
        telegram: 'https://t.me/+QgbmGp_rCMNkYWM6',
        organizers: [
            {
                id: 25,
                image: DataImages.community.admins.Rezedafilipenko,
                name: 'Резеда Филипенко',
                about: undefined,
                telegram: 'https://t.me/Rezeda8855',
                email: 'Rezedafilipenko@gmail.com',
            }
        ],
    },
    {
        id: 27,
        en: 'Voronezh',
        ru: 'Воронеж',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Voronezh,
        images: DataImages.community.meetings.Voronezh,
        telegram: 'https://t.me/+Vwngr-PzV4UyZTQ6',
        organizers: [
            {
                id: 26,
                image: DataImages.community.admins.jazz98,
                name: 'Сергей Крайнюков',
                about: 'Android-разработчик, IT-ONE',
                telegram: 'https://t.me/SergeiKrai',
                email: 'jazz98@mail.ru',
            }
        ],
    },
    {
        id: 28,
        en: 'Yekaterinburg',
        ru: 'Екатеринбург',
        country_en: 'Russia',
        country_ru: 'Россия',
        image: DataImages.community.cities.Yekaterinburg,
        images: DataImages.community.meetings.Yekaterinburg,
        telegram: 'https://t.me/+KNYG-E2XKExiZDEy',
        organizers: [
            {
                id: 27,
                image: DataImages.community.admins.youngfrezyx,
                name: 'Станислав Илин',
                about: undefined,
                telegram: 'https://t.me/frezyx',
                email: 'youngfrezyx@gmail.com',
            }
        ],
    },
    {
        id: 29,
        en: 'Yerevan',
        ru: 'Ереван',
        country_en: 'Armenia',
        country_ru: 'Армения',
        image: DataImages.community.cities.Yerevan,
        images: [],
        telegram: 'https://t.me/+YDyIS39l6hkzMDQy',
        organizers: [
            {
                id: 28,
                image: DataImages.community.admins.henrikhharutyunyan1998,
                name: 'Henrikh Harutyunyan',
                about: 'Android Developer',
                telegram: 'https://t.me/mobilevel',
                email: 'henrikhharutyunyan1998@gmail.com',
            }
        ],
    },
];
