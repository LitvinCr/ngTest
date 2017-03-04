angular
    .module('Educ8')
    .config(config)
    .factory('httpVisualizer', ['$rootScope', 'notifyService', '$q', '$injector', httpVisualizer])
    .factory('redirectForbidden', ['$q', '$location', redirectForbidden]);

function config(stateHelperProvider, $httpProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, LightboxProvider, appConstants, ngDialogProvider) {
    $locationProvider.html5Mode(true);

    var ROLES = appConstants.ROLES;

    LightboxProvider.fullScreenMode = true;

    /**
     * init stripe provider
     */
    Stripe.setPublishableKey(appConstants.STRIPE_KEY);

    /**
     * if page not found
     */
    $urlRouterProvider.otherwise(function ($injector) {
        var stateGo = $injector.get('$state');
        stateGo.go('index.404');
    });

    /**
     * init ngDialog provider
     */
    ngDialogProvider.setDefaults({
        className: "ngdialog-theme-default",
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false
    });

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    stateHelperProvider
        .state({
            name: "login",
            url: "/login",
            templateUrl: "js/components/auth/login.html",
            controller: 'LoginController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Login'
            }
        })
        .state({
            name: "forgotPassword",
            url: "/forgot-password",
            templateUrl: "js/components/auth/forgotPassword.html",
            controller: 'LoginController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Forgot password'
            }
        })
        .state({
            name: "signup",
            url: '/signup',
            templateUrl: 'js/components/signup/page.html',
            children: [
                {
                    name: 'base',
                    url: '/base',
                    templateUrl: 'js/components/signup/base/signUp.html',
                    controller: 'signUpController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Sign Up',
                        registrationStep: 1
                    }
                },
                {
                    name: 'preview',
                    url: "/preview",
                    templateUrl: "js/components/signup/preview/preview.html",
                    controller: 'previewController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Preview',
                        registrationStep: 2
                    }
                },
                {
                    name: 'price',
                    url: "/price",
                    templateUrl: "js/components/signup/price/page.html",
                    controller: 'priceController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Subscription Details',
                        registrationStep: 3
                    }
                },
                {
                    name: 'confirmation',
                    url: "/confirmation",
                    templateUrl: "js/components/signup/confirmation/confirmation.html",
                    controller: 'confirmationController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Confirmation',
                        registrationStep: 4
                    }
                },
                {
                    name: "lessons",
                    url: "/course/{id:int}/lessons",
                    templateUrl: "js/components/signup/lessons/list.html",
                    controller: 'lessonListController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Lessons',
                        needSubscription: true
                    }
                },
                {
                    name: 'lesson',
                    url: "/lesson/:id?course",
                    templateUrl: "js/components/signup/lessons/detail.html",
                    controller: 'lessonController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Lessons view'
                    }
                }
            ]
        })
        .state({
            name: 'landing',
            url: "/",
            templateUrl: "js/components/static/landing/page.html",
            controller: 'staticController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Landing page',
                isPublic: true
            },
            children: []
        })
        .state({
            name: 'home',
            url: "/home",
            templateUrl: "js/components/static/page.html",
            controller: 'staticController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Homepage'
            },
            children: [
                {
                    name: 'main',
                    url: "/main",
                    templateUrl: "js/components/static/home/page.html",
                    data: {
                        pageTitle: 'Edtech Tips'
                    }
                },
                {
                    name: 'forum',
                    url: "/forum",
                    templateUrl: "js/components/static/forum/page.html"
                },
                {
                    name: 'edtech',
                    url: "/edtech",
                    templateUrl: "js/components/static/edtech/page.html",
                    children: [
                        {
                            name: 'base',
                            url: "/base",
                            templateUrl: "js/components/static/edtech/base.html"
                        },
                        {
                            name: 'guide',
                            url: "/guide",
                            templateUrl: "js/components/static/edtech/guide.html"
                        },
                        {
                            name: 'plans',
                            url: "/plans",
                            templateUrl: "js/components/static/edtech/plans.html"
                        },
                        {
                            name: 'curriculum',
                            url: "/curriculum",
                            templateUrl: "js/components/static/edtech/curriculum.html",
                            children: [
                                {
                                    name: 'base',
                                    url: "/base",
                                    templateUrl: "js/components/static/edtech/curriculumBase.html"
                                },
                                {
                                    name: 'ireland',
                                    url: "/ireland",
                                    templateUrl: "js/components/static/edtech/curriculumIreland.html"
                                },
                                {
                                    name: 'england',
                                    url: "/england",
                                    templateUrl: "js/components/static/edtech/curriculumEngland.html"
                                },
                                {
                                    name: 'rest',
                                    url: "/rest-of-world",
                                    templateUrl: "js/components/static/edtech/curriculumRest.html"
                                }
                            ]
                        },
                        {
                            name: 'itIssues',
                            url: "/it-issues",
                            templateUrl: "js/components/static/edtech/itIssues.html"
                        },
                        {
                            name: 'assessment',
                            url: "/assessment",
                            templateUrl: "js/components/static/edtech/assessment.html"
                        },
                        {
                            name: 'selfAssessment',
                            url: "/self-assessment",
                            templateUrl: "js/components/static/edtech/selfAssessment.html"
                        },
                        {
                            name: 'classroom',
                            url: "/classroom",
                            templateUrl: "js/components/static/edtech/classroom.html"
                        },
                        {
                            name: 'sharing',
                            url: "/sharing",
                            templateUrl: "js/components/static/edtech/sharing.html"
                        }
                    ]
                },
                {
                    name: 'additionalResources',
                    url: "/additional-resources",
                    templateUrl: "js/components/static/additionalResources/page.html",
                    children: [
                        {
                            name: 'base',
                            url: "/base",
                            templateUrl: "js/components/static/additionalResources/base.html"
                        },
                        {
                            name: 'teacherTools',
                            url: "/teacher-tools",
                            templateUrl: "js/components/static/additionalResources/teacherTools.html"
                        },
                        {
                            name: 'staffTraining',
                            url: "/staff-training",
                            templateUrl: "js/components/static/additionalResources/staffTraining.html"
                        },
                        {
                            name: 'unpluggedActivities',
                            url: "/unplugged-activities",
                            templateUrl: "js/components/static/additionalResources/unpluggedActivities/page.html",
                            controller: 'studResourcesController',
                            controllerAs: 'vm',
                            children: [
                                {
                                    name: 'base',
                                    url: "/base",
                                    templateUrl: "js/components/static/additionalResources/studentResources/unpluggedActivities/base.html"
                                },
                                {
                                    name: 'plan',
                                    url: "/plan",
                                    templateUrl: "js/components/static/additionalResources/studentResources/unpluggedActivities/plan.html"
                                },
                                {
                                    name: 'presentation',
                                    url: "/presentation",
                                    templateUrl: "js/components/static/additionalResources/studentResources/unpluggedActivities/presentation.html"
                                }
                            ]
                        },
                        {
                            name: 'beeBot',
                            url: "/bee-bot",
                            templateUrl: "js/components/static/additionalResources/studentResources/beeBot/page.html",
                            controller: 'studResourcesController',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'safety',
                            url: "/online-safety",
                            templateUrl: "js/components/static/additionalResources/studentResources/onlineSafety/page.html",
                            controller: 'studResourcesController',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'studentResources',
                            url: "/student-resources",
                            templateUrl: "js/components/static/additionalResources/studentResources/page.html",
                            children: [

                            ]
                        }
                    ]
                },
                {
                    name: 'eSafety',
                    url: "/e-safety",
                    templateUrl: "js/components/static/eSafety/page.html",
                    children: [
                        {
                            name: 'base',
                            url: "/base",
                            templateUrl: "js/components/static/eSafety/base.html"
                        },
                        {
                            name: 'earlyPrimary',
                            url: "/early-primary",
                            templateUrl: "js/components/static/eSafety/earlyPrimary/page.html"
                        },
                        {
                            name: 'primary',
                            url: "/primary-{id:int}",
                            templateUrl: "js/components/static/eSafety/primary/page.html",
                            controller: 'esafetyController',
                            controllerAs: 'vm',
                            children: [
                                {
                                    name: 'base',
                                    url: "/base",
                                    templateUrl: "js/components/static/eSafety/primary/base.html"
                                },
                                {
                                    name: 'plan',
                                    url: "/plan",
                                    templateUrl: "js/components/static/eSafety/primary/plan.html"
                                },
                                {
                                    name: 'presentation',
                                    url: "/presentation",
                                    templateUrl: "js/components/static/eSafety/primary/presentation.html"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'otherServices',
                    url: "/other-services",
                    templateUrl: "js/components/static/otherServices/page.html"
                }
            ]
        })
        .state({
            name: 'index',
            url: "/index",
            templateUrl: "views/common/content.html",
            children: [
                {
                    name: "schoolClasses",
                    url: "/school-classes",
                    templateUrl: "js/components/schoolClasses/base.html",
                    controller: 'SchoolClassesController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Classes',
                        openedPage: false,
                        availableFor: [
                            ROLES.PRINCIPAL
                        ]
                    },
                    children: [
                        {
                            name: "completed",
                            url: "/completed",
                            templateUrl: "js/components/schoolClasses/completed.html",
                            controller: 'completedListController',
                            controllerAs: 'vm',
                            data: {
                                pageTitle: 'Completed classes'
                            }
                        },
                        {
                            name: "active",
                            url: "/active",
                            templateUrl: "js/components/schoolClasses/active.html",
                            controller: 'activeListController',
                            controllerAs: 'vm',
                            data: {
                                pageTitle: 'Active classes'
                            }
                        }
                    ]
                },
                {
                    name: "404",
                    url: "/404",
                    templateUrl: "views/common/404.html",
                    data: {
                        pageTitle: 'Page not found'
                    }
                },
                {
                    name: "schoolPlan",
                    url: "/school-plan",
                    templateUrl: "js/components/schoolPlan/page.html",
                    controller: 'schoolPlanController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'School Plan',
                        needSubscription: true,
                        availableFor: [
                            ROLES.PRINCIPAL,
                            ROLES.TEACHER
                        ]
                    }
                },
                {
                    name: "schoolPlan.lessons",
                    url: "/school-plan/course/{id:int}/lessons",
                    templateUrl: "js/components/lessons/list.html",
                    controller: 'planLessonsController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Lessons',
                        needSubscription: true
                    }
                },
                {
                    name: "schoolPlan.lessons.detail",
                    url: "/school-plan/course/{courseId:int}/lessons/{id:int}",
                    templateUrl: "js/components/lessons/detail/page.html",
                    controller: 'lessonDetailController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Lesson information',
                        needSubscription: true
                    },
                    children: [
                        {
                            name: 'base',
                            url: '/base',
                            templateUrl: 'js/components/lessons/detail/base.html',
                        },
                        {
                            name: 'plan',
                            url: '/plan',
                            templateUrl: 'js/components/lessons/detail/plan.html',
                        },
                        {
                            name: 'video',
                            url: '/video',
                            templateUrl: 'js/components/lessons/detail/video.html',
                        },
                        {
                            name: 'presentation',
                            url: '/presentation',
                            templateUrl: 'js/components/lessons/detail/presentation.html',
                        },
                        {
                            name: 'lesson',
                            url: '/lesson',
                            templateUrl: 'js/components/lessons/detail/lesson.html',
                        }
                    ]
                },
                {
                    name: "activity",
                    url: "/activity",
                    templateUrl: "js/components/activity/list.html",
                    controller: 'activityController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Activity/Staff',
                        needSubscription: true,
                        availableFor: [
                            ROLES.PRINCIPAL
                        ]

                    }
                },
                {
                    name: "feedback",
                    url: "/feedback",
                    templateUrl: "js/components/feedback/feedback.html",
                    controller: 'feedbackController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Feedback',
                        needSubscription: true,
                        availableFor: [
                            ROLES.PRINCIPAL
                        ]
                    }
                },
                {
                    name: "settings",
                    url: "/settings",
                    templateUrl: "js/components/settings/page.html",
                    controller: 'settingsController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Settings',
                        needSubscription: false,
                        availableFor: [
                            ROLES.PRINCIPAL
                        ]
                    }
                },
                {
                    name: "class",
                    url: "/class",
                    templateUrl: "js/components/classes/detail_teacher.html",
                    controller: 'classDetailController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Class',
                        needSubscription: true,
                        availableFor: [
                            ROLES.TEACHER
                        ]
                    }
                },
                {
                    name: "classInfo",
                    url: "/class/{id:int}",
                    templateUrl: "js/components/classes/detail_principal.html",
                    controller: 'classDetailController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Class',
                        needSubscription: true,
                        availableFor: [
                            ROLES.PRINCIPAL
                        ]
                    }
                },
                {
                    name: "classModify",
                    url: "/class/modify",
                    templateUrl: "js/components/classes/form.html",
                    controller: 'ClassCreateController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'New class',
                        needSubscription: true,
                        availableFor: [
                            ROLES.TEACHER
                        ]
                    }
                },
                {
                    name: "classModifyCompleted",
                    url: "/class/modify/{id:int}",
                    templateUrl: "js/components/classes/form.html",
                    controller: 'ClassCreateController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'New class',
                        needSubscription: true,
                        availableFor: [
                            ROLES.TEACHER
                        ]
                    }
                },
                {
                    name: "completedClasses",
                    url: "/class/completed",
                    templateUrl: "js/components/classes/completed.html",
                    controller: 'completedController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Сompleted classes',
                        needSubscription: true,
                        availableFor: [
                            ROLES.TEACHER
                        ]
                    }
                },
                {
                    name: "studentClasses",
                    url: "/classes",
                    templateUrl: "js/components/studentClasses/page.html",
                    controller: 'studentClassesController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Classes',
                        needSubscription: true,
                        availableFor: [
                            ROLES.STUDENT
                        ]
                    }
                },
                {
                    name: "studentClasses.lesson",
                    url: "/classes/course/{courseId:int}/lessons/{id:int}",
                    templateUrl: "js/components/lessons/detail/page.html",
                    controller: 'lessonDetailController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Lesson information',
                        needSubscription: true,
                        availableFor: [
                            ROLES.STUDENT
                        ]
                    },
                    children: [
                        {
                            name: 'base',
                            url: '/base',
                            templateUrl: 'js/components/lessons/detail/base.html',
                        },
                        {
                            name: 'plan',
                            url: '/plan',
                            templateUrl: 'js/components/lessons/detail/plan.html',
                        },
                        {
                            name: 'video',
                            url: '/video',
                            templateUrl: 'js/components/lessons/detail/video.html',
                        },
                        {
                            name: 'presentation',
                            url: '/presentation',
                            templateUrl: 'js/components/lessons/detail/presentation.html',
                        },
                        {
                            name: 'lesson',
                            url: '/lesson',
                            templateUrl: 'js/components/lessons/detail/lesson.html',
                        }
                    ]
                }
            ]
        });

    $httpProvider.interceptors.push('httpVisualizer');
    $httpProvider.interceptors.push('redirectForbidden');
}


function redirectForbidden($q, $location) {
    return {
        responseError: function (response) {
            if (response.status === 403) {
                return $location.path('/index/404');
            }

            return $q.reject(response);
        }
    }
}

/**
 * Interceptor for count pending ajax requests
 * @param $rootScope
 * @param notifyService
 * @param $q
 * @param $injector
 * @returns {{request: request, response: response, responseError: responseError}}
 */
function httpVisualizer($rootScope, notifyService, $q, $injector) {

    return {
        request: function (request) {
            $rootScope.queue++;

            if (!$rootScope.inProgress) {
                $rootScope.inProgress = true;

                disableButtons();
            }
            
            return request;
        },
        response: function(response) {
            $rootScope.queue--;

            if ($rootScope.queue <= 0) {
                $rootScope.inProgress = false;

                enableButtons();
            }

            return response;
        },
        responseError: function(response) {
            $rootScope.queue--;

            if ($rootScope.queue <= 0) {
                $rootScope.inProgress = false;

                enableButtons();
            }

            // logout user
            if (response.status == 401) {
                var $http = $injector.get('$http');

                $rootScope.profile = {};
                localStorage.clear();

                $http.defaults.headers.common.Authorization = '';
            }

            // sometimes no need to show error notification
            // it could be set manually
            if ( $rootScope.disableNotification ) {
                return $q.reject(response);
            }

            notifyService(response);

            return $q.reject(response);
        }
    };
}

/**
 * Disable all submit buttons while request in progress
 */
function disableButtons() {
    angular.element('input[type="submit"], button[type="submit"]').attr('disabled', 'disabled');
}

/**
 * Enable all submit buttons after request finished
 */
function enableButtons() {
    angular.element('input[type="submit"], button[type="submit"]').removeAttr('disabled');
}