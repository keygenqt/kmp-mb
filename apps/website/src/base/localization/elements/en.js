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

export const enLocalization = {
    translation: {
        common: {
            t_more: 'More details',
            t_none: 'None',
            t_error_500: 'An error occurred, please try again later.',
        },
        components: {
            error: {
                t_title: 'Page not found.',
                t_text: "The Page you are looking for doesn't exist.",
                t_btn: 'Go to Home',
            },
            coming_soon: {
                t_title: 'Under construction.',
                t_text: 'The page you have arrived at is still under construction.',
                t_btn: 'Go to Home',
            },
        },
        layouts: {
            header: {
                t_community: 'Community',
                t_experts: 'Experts',
            },
            footer: {
                t_founders: 'Founders',
                t_founder_k_title: 'Kirill Rozov',
                t_founder_k_text: 'Blogger, founder of Android Broadcast',
                t_founder_a_title: 'Alexey Gladkov',
                t_founder_a_text: 'Blogger, Aurora and Kotlin Multiplatform',
                t_contacts: 'Contacts',
                t_copyright: '© Mobile Broadcast 2024',
            }
        },
        pages: {
            home: {
                t_BlockAbout_title: 'Mobile Broadcast',
                t_BlockAbout_text: 'This is an international community for everyone who is passionate about mobile development. This is a place where the boundaries between platforms blur and the only thing that matters is your interest and passion for mobile technology.',
                t_BlockAbout_btn: 'Join the community',

                t_BlockPartners_title: 'Partners',
                t_BlockPartners_text: 'If you would like to become a community partner, please contact us and we will discuss the details.',
                t_BlockPartners_btn: 'Leave a statement',

                t_BlockCards_item1_title: 'Create a community',
                t_BlockCards_item1_text: 'You can apply to register a community in your city',
                t_BlockCards_item2_title: 'List of communities',
                t_BlockCards_item2_text: 'Here you can find a list of Mobile Broadcast communities',
            },
            community: {
                t_title: 'Community',
                t_text: "The main driver of the branch is the organizer, he organizes events and moderates the city’s Telegram group. If you don't find your city on this list, you can open a community branch in your city by becoming a Mobile Broadcast organizer.",
                t_subtext: 'Join our friendly community!',
                t_btn: 'Create a community',
                t_filter_search: 'Search',
                t_filter_country: 'Country',
                t_not_found: 'Nothing found, try changing your query.',
            },
            experts: {
                t_title: 'Experts',
                t_text: 'Each of the experts is responsible for a specific area, actively participates in its development and popularization, and also shares their expertise with members of our community.',
                t_subtext: 'Become one of the experts in mobile development for iOS, Android, Kotlin, Aurora OS and other areas!',
                t_btn: 'Apply',
                t_filter_search: 'Search',
                t_filter_direction: 'Direction',
                t_not_found: 'Nothing found, try changing your query.',
            },
            expert: {
                t_media: 'Media'
            },
            city: {
                t_text1: 'Welcome to the {{city}} community page! If you find a gallery on the page, these are our meetings where we discuss all sorts of different IT issues. If suddenly she’s not there, we haven’t had time to take a photo yet, but everything is ahead.',
                t_text2: 'Also on this page you will find the organizers; you can contact them and discuss important matters. If there are no organizers on the page yet, this happens; it is still in the process of formation.',
                t_text3: 'Join the community, it will be interesting!',
                t_join_btn: 'Join the community',
                t_administrator: 'Join the community',
                t_organizer: 'Organizer',
                t_organizers: 'Organizers',
            },
            registrationExpert: {
                t_title: 'Registration for Mobile Broadcast Experts status',
                t_text: 'Mobile Broadcast Experts is a community of mobile technology experts who build communities and share their knowledge.',
                t_subtext: 'Important! The review period depends on the workload of the experts, so it may vary. If you are refused, you can try again in six months. The commission does not comment on the reasons for refusal.',
                t_error_form: 'The form is filled out incorrectly, please check it.',
                t_success_reg: 'Application sent. Thank you!',
                t_block1_title: 'Direction',
                t_block1_subtitle: 'Links for review:',
                t_block1_subtitle_link1: 'who can become an expert',
                t_block1_subtitle_link2: 'what an expert should do',
                t_block2_title: 'About yourself',
                t_block2_subtitle: 'Introduce yourself and leave your contact information.',
                t_block3_title: 'Expertise',
                t_block3_subtitle: 'Within this section, you must confirm your experience in the technology and that you have developed complex projects using it. It would be useful to tell about the projects and what you did in them, as well as links to the Open Source projects you contributed to.',
                t_block4_title: 'Contribution to the community',
                t_block4_subtitle: 'Tell us about your public activities for at least the past year since you submitted your application, indicating links and coverage (how many viewers, views, etc.). Based on this information, we will evaluate your contribution to the development of the technology community.',
                t_field_directionID: 'Direction',
                t_field_directionID_help: 'If you wish to apply for other directions, you can do so after your first application has been reviewed privately.',
                t_field_expertID: 'Expert',
                t_field_expertID_help: 'To apply for MBE status, an existing expert in any technology will need to endorse your application.',
                t_field_why: 'Motivation',
                t_field_why_help: 'Please tell us about your motivation for becoming an MBE.',
                t_field_fname: 'First name',
                t_field_lname: 'Last name',
                t_field_email: 'E-Mail',
                t_field_telegram: 'Telegram',
                t_field_cv: 'CV',
                t_field_location: 'Where are you located?',
                t_field_location_help: 'City, country, coordinates...',
                t_field_experience: 'Experience in technology',
                t_field_experience_help: 'Tell us why you are an outstanding specialist in the specified technology.',
                t_field_contribution: 'Activities',
                t_field_contribution_help: 'Tell us about your public activities for at least the past year since you submitted your application, indicating links and coverage (how many viewers, views, etc.). Based on this information, we will evaluate your contribution to the development of the community on the technology.',
                t_button_submit: 'Submit',
            }
        },
        // Server content localization
        'Must be greater than or equal to 1.': 'Should not be empty.',
        'Must not be null and not blank.': 'Should not be empty.',
        'Must be a well-formed email address.': 'Must be a well-formed email address.',
        'Must be a valid URL.': 'Must be a valid URL.',
        'Size must be between 3 and 1000.': 'Size must be between 3 and 1000.',
        'Size must be between 3 and 250.': 'Size must be between 3 and 250.',
    },
};
