'use strict';
angular.module('Educ8')
    .constant('appConstants', {
        'APP_NAME': 'Educ8',
        'APP_EMAIL': 'bevzsv91@gmail.com',
        'BASE_URL': location.host,
        'API_URL': 'http://' + location.host + '/api/v1/',
        'SERVER_URL' : 'http://' + location.host,
        'FORUM_URL': 'http://forum.' + location.host ,
        'ROLES': {
            'STUDENT': 1,
            'TEACHER': 2,
            'PRINCIPAL': 3,
            'ADMIN': 4
        },
        'PLATFORM_TYPE': [
            {
                name: 'Tablet',
                type: 1,
                selected: false
            },
            {
                name: 'Windows',
                type: 2,
                selected: false
            },
            {
                name: 'Chromebook',
                type: 3,
                selected: false
            },
            {
                name: 'Mac',
                type: 4,
                selected: false
            },
            {
                name: 'Bee Bots',
                type: 5,
                selected: false
            }
        ],
        'COURSE_TYPE': [
            {
                name: 'Computer science',
                type: 1
            },
            {
                name: 'Digital Literacy',
                type: 2
            },
            {
                name: 'IT',
                type: 3
            }
        ],
        'PERIOD_OF_PLAN': [
            {
                name: 'Early Primary',
                type: 1
            },
            {
                name: 'Primary 1 / 2',
                type: 2
            },
            {
                name: 'Primary 3 / 4',
                type: 3
            },
            {
                name: 'Primary 5 / 6',
                type: 4
            }
        ],
        'SCHOOL': [
            {
                value: 'SMALL',
                text: 'Small (1 to 8 teachers)',
                maxTeachers: 8
            },
            {
                value: 'MEDIUM',
                text: 'Medium (9 to 16 teachers)',
                maxTeachers: 16
            },
            {
                value: 'LARGE',
                text: 'large (from 16 teachers)',
                maxTeachers: 100
            }
        ],
        'PRINCIPAL_REGISTRATION_STEPS': {
            'SIGNUP': {
                step: 1
            },
            'PREVIEW': {
                step: 2
            },
            'PRICE': {
                step: 3
            },
            'CONFIRMATION': {
                step: 4
            }
        },
        'PLAN_SORT': {
            PERIOD: 1,
            TYPE: 2
        },
        'SUBSCRIPTION_TYPE': {
            /**
             * subscription is not paid, users can see only 2 first lessons in course
             */
            TRIAL: 1,
            /**
             * subscription was paid, users can do anything
             */
            FULL: 2,
            /**
             * if subscription - set type 3
             */
            LIMITED: 3
        },
        'S3_PATCH': 'https://education8.s3.eu-west-2.amazonaws.com/',
        //live key
        // 'STRIPE_KEY': 'pk_live_cm1IOUwVP6GauQ2TWCFpia0z',
        //test key
        'STRIPE_KEY': 'pk_test_7d3SozlItwoNNpamPZbhlGjT',
        ASSESSMENTS: {
            MAX_COUNT: 7,
            MIN_COUNT: 3
        },
        MAX_COURSES_IN_SCHOOL: 3,
        ASSESSMENTS_TYPES: [
            {
                title: 'Red',
                index: 1,
                color: 'red',
                info: 'Needs Further Support'
            },
            {
                title: 'Orange',
                index: 2,
                color: 'yellow',
                info: 'Achieving with Support'
            },
            {
                title: 'Green',
                index: 3,
                color: 'green',
                info: 'Achieving Independently'
            },
            {
                title: 'Purple',
                index: 4,
                color: 'purple',
                info: 'Exceeding Expectations'
            }
        ],
        ASSESSMENTS_TEMPLATES: [
            {
                title: 'Assessment- Primary 1 and 2',
                assessmentsByBlocks: [
                    {
                        assessments: [
                            {title: 'Understand what algorithms are', type: 1},
                            {title: 'Understand that algorithms are implemented as programs on digital devices', type: 1},
                            {title: 'Understand that programs execute by following precise and unambiguous instructions', type: 1},
                            {title: 'Create simple programs', type: 1},
                            {title: 'Debug simple programs', type: 1},
                            {title: 'Use logical reasoning to predict the behaviour of own programs', type: 1},
                            {title: 'Use logical reasoning to predict the behaviour of others’ programs', type: 1}
                        ]
                    },
                    {
                        assessments: [
                            {title: 'Plan a fiction/ non-fiction story for sharing through digital media; including use of digital tools (voice, downloads etc.)', type: 2},
                            {title: 'Create a story using digital media', type: 2},
                            {title: 'Store projects digitally – ideally through more than one method', type: 2},
                            {title: 'Retrieve projects from stored location and recommence work seamlessly', type: 2},
                            {title: 'Edit content for effect; focus on effective use of digital information sharing tools', type: 2}
                        ]
                    },
                    {
                        assessments: [
                            {title: 'Recognise common uses of information technology at home', type: 3},
                            {title: 'Recognise common uses of information technology at school/ work', type: 3},
                            {title: 'Recognise common uses of information technology outdoors', type: 3},
                            {title: 'Use technology safely', type: 3},
                            {title: 'Keep personal information private', type: 3},
                            {title: 'Use technology respectfully', type: 3},
                            {title: 'Support when they have concerns about content or contact on the internet or other online technologies', type: 3},
                        ]
                    }
                ]

            },
            {
                title: 'Assessment- Primary 3 and 4',
                assessmentsByBlocks: [
                    {
                        assessments: [
                            {title: 'Write programs that accomplish specific goals', type: 1},
                            {title: 'Write programs that accomplish specific goals', type: 1},
                            {title: 'Debug programs', type: 1},
                            {title: 'Control or simulate physical systems', type: 1},
                            {title: 'Work with various forms of input', type: 1},
                            {title: 'Work with various forms of output', type: 1},
                            {title: 'Explain how some simple algorithms work', type: 1},
                            {title: 'Detect and correct errors in algorithms and programs', type: 1}
                        ]
                    },
                    {
                        assessments: [
                            {title: 'Write a plan for sharing information effectively using digital tools', type: 2},
                            {title: 'Use a range of programs/apps to share this information', type: 2},
                            {title: 'Design digital content for a given audience', type: 2},
                            {title: 'Create digital content that shares information with purposeful choice of digital tools', type: 2},
                            {title: 'Use tools skilfully to create the final product', type: 2},
                            {title: 'Edit/ publish final draft according to original plans/ target audience', type: 2},
                        ]
                    },
                    {
                        assessments: [
                            {title: 'Use search technologies effectively', type: 3},
                            {title: 'Appreciate how results are selected and ranked', type: 3},
                            {title: 'Be discerning in evaluating digital content', type: 3},
                            {title: 'Use technology safely, respectfully and responsibly', type: 3},
                            {title: 'Recognise acceptable/unacceptable behaviour', type: 3},
                            {title: 'Design a system to collect data', type: 3},
                            {title: 'Collect and analyse the data', type: 3},
                            {title: 'Evaluate the data and create document to detail findings', type: 3},
                            {title: 'Present data/ findings and conclusion', type: 3}
                        ]
                    }
                ]
            },
            {
                title: 'Assessment- Primary 5 and 6',
                assessmentsByBlocks: [
                    {
                        assessments: [
                            {title: 'Solve problems by decomposing them into smaller parts', type: 1},
                            {title: 'Use repetition in programs', type: 1},
                            {title: 'Use selection in programs', type: 1},
                            {title: 'Work with variables and various forms of input and output', type: 1},
                            {title: 'Use logical reasoning to explain how some simple algorithms work', type: 1},
                            {title: 'Use logical reasoning to detect and correct errors in algorithms and programs', type: 1}
                        ]
                    },
                    {
                        assessments: [
                            {title: 'Write a plan for sharing information effectively using digital tools', type: 2},
                            {title: 'Use a range of programs/apps to share this information', type: 2},
                            {title: 'Design digital content for a given audience with consideration for most effective tools', type: 2},
                            {title: 'Create digital content that shares information purposefully and effectively', type: 2},
                            {title: 'Use cloud storage/ alternative storage and sharing facility that shows understanding of saving, sharing and file types', type: 2}
                        ]
                    },
                    {
                        assessments: [
                            {title: 'Understand computer networks including the internet (and school network if you have one)', type: 3},
                            {title: 'Understand that the internet can be used for a variety of services including the world wide web', type: 3},
                            {title: 'Identify concerning content', type: 3},
                            {title: 'Identify concerning contact', type: 3},
                            {title: 'Report concerning content/ contact', type: 3},
                            {title: 'Use a network (cloud preferably) for sharing and collaborating on a document', type: 3},
                            {title: 'Collaborative research', type: 3},
                            {title: 'Analyse/fact check research', type: 3},
                            {title: 'Present coherent findings in purposefully designed format', type: 3}
                        ]
                    }
                ]
            }
        ]
    });