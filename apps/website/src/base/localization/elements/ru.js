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

export const ruLocalization = {
    translation: {
        common: {
            t_more: 'Подробнее',
            t_none: 'Не выбрано',
            t_error_500: 'Произошла ошибка, попробуйте позже.',
        },
        components: {
            error: {
                t_title: 'Страница не найдена.',
                t_text: 'Страница, которую вы ищете, не существует.',
                t_btn: 'На главную',
            },
            coming_soon: {
                t_title: 'Страница в разработке.',
                t_text: 'Страница, на которую вы перешли, еще в разработке.',
                t_btn: 'На главную',
            },
        },
        layouts: {
            header: {
                t_community: 'Сообщество',
                t_experts: 'Эксперты',
            },
            footer: {
                t_founders: 'Основатели',
                t_founder_k_title: 'Кирилл Розов',
                t_founder_k_text: 'Блогер, основатель Android Broadcast',
                t_founder_a_title: 'Алексей Гладков',
                t_founder_a_text: 'Блогер, Aurora и Kotlin Multiplatform',
                t_contacts: 'Контакты',
                t_copyright: '© Mobile Broadcast 2024',
            }
        },
        pages: {
            home: {
                t_BlockAbout_title: 'Mobile Broadcast',
                t_BlockAbout_text: 'Это международное сообщество для всех, кто увлечен мобильной разработкой. Это место, где границы между платформами стираются, и единственное, что имеет значение - ваш интерес и страсть к мобильным технологиям.',
                t_BlockAbout_btn: 'Присоединиться к сообществу',

                t_BlockPartners_title: 'Партнёры',
                t_BlockPartners_text: 'Если вы хотите стать партнером сообщества, свяжитесь с нами, мы обсудим детали.',
                t_BlockPartners_btn: 'Оставить заявление',

                t_BlockCards_item1_title: 'Создать сообщество',
                t_BlockCards_item1_text: 'Вы можете подать заявку на регистрацию сообщества в своем городе',
                t_BlockCards_item2_title: 'Список сообществ',
                t_BlockCards_item2_text: 'Тут можно ознакомиться со списком сообществ Mobile Broadcast',
            },
            community: {
                t_title: 'Сообщество',
                t_text: 'Главный двигатель филиала - организатор, он организовывает мероприятия и модерирует группу города в Telegram. Если вы не находите свой город в этом списке, Вы можете открыть филиал сообщества в своем городе, став организатором Mobile Broadcast.',
                t_subtext: 'Присоединяйтесь к нашему дружному сообществу!',
                t_btn: 'Создать сообщество',
                t_filter_search: 'Поиск',
                t_filter_country: 'Страна',
                t_not_found: 'Ничего не найдено, попробуйте изменить запрос.',
            },
            experts: {
                t_title: 'Эксперты',
                t_text: 'Каждый из экспертов отвечает за определённое направление, активно участвует в его развитии и популяризации, а также делится своей экспертизой с участниками нашего сообщества.',
                t_subtext: 'Станьте одним из экспертов по мобильной разработке iOS, Android, Kotlin, ОС Аврора и других направлений!',
                t_btn: 'Подать заявление',
                t_filter_search: 'Поиск',
                t_filter_direction: 'Направление',
                t_not_found: 'Ничего не найдено, попробуйте изменить запрос.',
            },
            expert: {
                t_media: 'Медиа'
            },
            city: {
                t_text1: 'Добро пожаловать на страницу сообщества города {{city}}! Если на странице вы найдёте галерею — это наши встречи где мы обсуждаем всякие разные айтишности. Если вдруг ее нет — мы еще не успели сделать фото, но все впереди.',
                t_text2: 'Так же на этой странице вы найдёте организаторов, с ними можно связаться и обсудить важные дела. Если на странице еще нет организаторов, такое бывает, он еще в процессе становления.',
                t_text3: 'Присоединяйтесь с сообществу, будет интересно!',
                t_join_btn: 'Присоединиться к сообществу',
                t_organizer: 'Организатор',
                t_organizers: 'Организаторы',
            },
            registrationExpert: {
                t_title: 'Заявка на присвоение статуса Mobile Broadcast Experts',
                t_text: 'Mobile Broadcast Experts - это сообщество экспертов в мобильных технологиях, которые развивают сообщества и делятся своими знаниями.',
                t_subtext: 'Важно! Сроки рассмотрения зависят от загруженности экспертов, поэтому может варьироваться. Если вам отказали, то вы можете попробовать еще раз через полгода. Комиссия не комментирует причины отказа.',
                t_error_form: 'Форма заполнена неправильно, проверьте, пожалуйста.',
                t_success_reg: 'Заявка отправлена. Спасибо!',
                t_block1_title: 'Направление',
                t_block1_subtitle: 'Ссылки для ознакомления:',
                t_block1_subtitle_link1: 'кто может стать экспертом',
                t_block1_subtitle_link2: 'что должен делать эксперт',
                t_block2_title: 'О себе',
                t_block2_subtitle: 'Представьтесь и оставьте свои контакты.',
                t_block3_title: 'Экспертность',
                t_block3_subtitle: 'В рамках этой секции вы должны подтвердить свой опыт в технологи и что вы разрабатывали сложные проекты с её применением. Тут будет полезно рассказать про проекты и что вы в них делали, а также ссылки на Open Source проекты в которые вы контрибьютили.',
                t_block4_title: 'Вклад в сообщество',
                t_block4_subtitle: 'Расскажите о своих публичных активностях минимум за прошедший год с момента подачи заявки, указывая ссылки и охваты (сколько было зрителей, просмотров или прочее). На основе этой информации мы будем оценивать ваш вклад в развитие сообщества по технологии.',
                t_field_directionID: 'Направление',
                t_field_directionID_help: 'Если вы хотите подать заявки по другим направлениям то это можно будет сделать после рассмотрения первой заявки в частном порядке.',
                t_field_expertID: 'Эксперт',
                t_field_expertID_help: 'Чтобы подать заявку на присвоение статуса MBE кто-то из существующих экспертов по любой технологии должен будет поддержать вашу заявку.',
                t_field_why: 'Мотивация',
                t_field_why_help: 'Расскажите про вашу мотивацию стать MBE.',
                t_field_fname: 'Имя',
                t_field_lname: 'Фамилия',
                t_field_email: 'E-Mail',
                t_field_telegram: 'Telegram',
                t_field_cv: 'CV',
                t_field_location: 'Где вы находитесь?',
                t_field_location_help: 'Город, страна, координаты...',
                t_field_experience: 'Опыт в технологии',
                t_field_experience_help: 'Расскажите почему вы выдающийся специалист в указанной технологии.',
                t_field_contribution: 'Деятельность',
                t_field_contribution_help: 'Расскажите о своих публичных активностях минимум за прошедший год с момента подачи заявки, указывая ссылки и охваты (сколько было зрителей, просмотров или прочее). На основе этой информации мы будем оценивать ваш вклад в развитие сообщества по технологии.',
                t_button_submit: 'Отправить',
            },
            registrationOrganizer: {
                t_title: 'Заявка на организатора группы Mobile Broadcast',
                t_text: 'Если вы хотите начать организовывать новую группу Mobile Broadcast, то вы можете подать заявку через эту форму. Ознакомьтесь с уже ',
                t_text_link: 'существующими группами',
                t_subtext: 'Вы можете стать представителями Android Broadcast и Mobile Developer, Кирилла Розова и Алексея Гладкова, поэтому нам важно знать кто вы и вашу мотивацию, а также другие данные.',
                t_error_form: 'Форма заполнена неправильно, проверьте, пожалуйста.',
                t_success_reg: 'Заявка отправлена. Спасибо!',
                t_block1_title: 'Контактные данные',
                t_block1_subtitle: 'Заполните, пожалуйста, контактные данные для связи.',
                t_block2_title: 'Информации о группе',
                t_block2_subtitle: 'Укажите где бы вы хотели стать организатором группы.',
                t_checkbox_info: 'Ознакомиться с обязанностями организатора группы можно по ссылке: ',
                t_checkbox_info_link: 'обязанности организатора группы',
                t_block3_title: 'О себе',
                t_block3_subtitle: 'Давайте познакомимся, заполните немного информации про свои цели и опыт.',
                t_field_fname: 'Имя',
                t_field_lname: 'Фамилия',
                t_field_activity: 'Медиа активность',
                t_field_activity_help: 'Укажите ссылки на ваши соц сети. В случае если их не ведете - опишите почему не делаете этого.',
                t_field_experience: 'Опыт',
                t_field_experience_help: 'Расскажите свой опыт организации чего-либо.',
                t_field_why: 'Мотивация',
                t_field_why_help: 'Опишите подробно свою мотивацию для организацию группы.',
                t_field_telegram: 'Telegram',
                t_field_email: 'E-Mail',
                t_field_emailNotion: 'E-Mail Notion',
                t_field_emailNotion_help: 'E-Mail вашего аккаунта в Notion. Если нет нужно завести.',
                t_field_city: 'Город',
                t_field_country: 'Страна',
                t_field_expectations: 'Ожидания',
                t_field_expectations_help: 'Какие ваши ожидания по помощи от организаторов Mobile Broadcast?',
                t_field_checkbox: 'Согласен с обязанностями организатора.',
                t_button_submit: 'Отправить',
            },
            registrationPartner: {
                t_title: 'Заявка для партнеров группы Mobile Broadcast',
                t_text1: 'Mobile Broadcast – это международное сообщество для всех, кто увлечен мобильной разработкой. Это место, где границы между платформами стираются, и единственное, что имеет значение – интерес и страсть к мобильным технологиям.',
                t_text2: 'Нам не важен уровень участников, мы рады всем - и начинающим, и опытным разработчикам с большим опытом.',
                t_text3: 'Наше коммьюнити - это нетворк в 25+ городах Беларуси, России, Казахстана, Таджикистана, Узбекистана, Грузии, Турции, ОАЭ, Тайланда. Мы хотим развивать не только mobile направление, но и в целом tech сферу.',
                t_text4: 'Поэтому мы нуждаемся в поддержке и партнёрстве, ведь с вашей помощью мы сможем расширить горизонты сообщества, а также нам будет легче продвигать технологии в  мир.',
                t_error_form: 'Форма заполнена неправильно, проверьте, пожалуйста.',
                t_success_reg: 'Заявка отправлена. Спасибо!',
                t_form_title: 'Контактные данные',
                t_form_subtitle: 'Заполните немного информации о себе и мы свяжемся с вами.',
                t_form_format_title: 'В каком формате вы видите наше с вами партнерство?',
                t_field_company: 'Компания',
                t_field_fname: 'Имя',
                t_field_lname: 'Фамилия',
                t_field_email: 'E-Mail',
                t_field_telegram: 'Telegram',
                t_field_phone: 'Телефон',
                t_button_submit: 'Отправить',
            },
        },
        // Server content localization
        'Must be greater than or equal to 1.': 'Не должно быть пустым.',
        'Must not be null and not blank.': 'Не должно быть пустым.',
        'Must be a well-formed email address.': 'Адрес электронной почты должен быть действительный.',
        'Must be a valid URL.': 'Должен быть действительный URL.',
        'Size must be between 3 and 1000.': 'Размер должен быть от 3 до 1000.',
        'Size must be between 3 and 250.': 'Размер должен быть от 3 до 250.',
    },
};
