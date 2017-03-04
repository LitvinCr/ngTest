angular
    .module('Educ8')
    .run(['$rootScope', '$state', '$stateParams', 'userService', 'appConstants', '$location', runBlock]);

function runBlock($rootScope, $state, $stateParams, userService, appConstants, $location) {
    var routeData = {};

    $rootScope.specialClass = $state.current.data && $state.current.data.specialClass;
    $rootScope.currentState = $state.current.name;
    $rootScope.profile = {};

    $rootScope.queue = 0;

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        routeData.event = event;
        routeData.toState = toState;

        $rootScope.currentState = toState.name;
        $rootScope.specialClass = toState.data && toState.data.specialClass;

        checkAccess();
    });

    getCurrentUser();


    /**
     * Get user and check permissions
     */
    function getCurrentUser() {
        userService.getCurrent()
            .then(function (user) {
                    checkAccess();
                },
                function (err) {
                    if ( err ) {
                        checkAccess();
                    }
                }
            );
    }

    /**
     * Check users permissions
     */
    function checkAccess() {
        var user = userService.data;

        var toStateData = routeData.toState && routeData.toState.data;

        var isSingupBaseStep = toStateData && toStateData.registrationStep === 1;
        var isPreviewStep = toStateData && toStateData.registrationStep === 2;
        var isPublicRoute = toStateData && toStateData.isPublic;

        // other checks not need for public routes
        if ( isPublicRoute ) {
            return;
        }

        // also no need to check preview
        // because principal can go back from price to preview
        if ( isPreviewStep && user.id ) {
            return;
        }

        // user not found
        if ( !isSingupBaseStep && !user.id ) {
            return $location.path('/');
        }

        // check registration steps for principal
        checkRegistrationStep(routeData);

        //check if page has limited access and subscription expired - need redirect to opened page
        checkLimitedAccess(routeData);

        // next checks only for signin users
        if ( user.id ) {
            // check subscription expiredAt
            checkSubscriptionExpiredAt(user);

            // check for roles permissions
            checkRoleAccess(routeData, user);
        }
    }

    /**
     * check access to this page for current user
     * @param routeData
     * @param user
     */
    function checkRoleAccess(routeData, user) {
        var toStateData = routeData.toState.data;
        var availableFor = toStateData && toStateData.availableFor;

        //page opened for all
        if (!availableFor || !availableFor.length) {
            return;
        }

        //if user has access to this page
        if (availableFor.indexOf(user.role) !== -1) {
            return;
        }

        return $location.path('/index');
    }

    /**
     * if subscription expiredAt less then current date - set subscriptionType = 'LIMITED' (3)
     * @param user
     */
    function checkSubscriptionExpiredAt(user) {
        var schoolExpired = user.school && user.school.expiredAt;

        // check school expired date
        if (schoolExpired && ( moment(schoolExpired) < moment() )) {
            $rootScope.profile.school.subscriptionType = appConstants.SUBSCRIPTION_TYPE.LIMITED;
            $rootScope.profile.school.limitedAccess = true;
        }
    }

    /**
     * redirect user uf school has limited access
     */
    function checkLimitedAccess(routeData) {
        var profile = $rootScope.profile;
        var ROLES = appConstants.ROLES;
        var toStateData = routeData.toState && routeData.toState.data;

        if ( toStateData && toStateData.needSubscription && profile.school.limitedAccess) {
            switch (profile.role) {
                //if user is principal - need redirect to settings
                case ROLES.PRINCIPAL:
                    return $location.path('/index/settings');

                default:
                    return $location.path('/');
            }
        }
    }

    /**
     * Check current registration step for principal
     * @param routeData
     */
    function checkRegistrationStep(routeData) {
        var user = userService.data;

        // no need to check registration steps for non principal
        if (user.role !== appConstants.ROLES.PRINCIPAL) {
            return;
        }

        var signupRoute = getSignupRoutes(user);
        var isOnOtherPage = (routeData.toState.name !== signupRoute.name);

        // check that registration route not equal to current page
        if (signupRoute.name && isOnOtherPage) {
            var allowedAdditionalRoutes = ['signup.course', 'signup.lesson', 'signup.lessons', 'signup.price'];
            var isNotAdditionalRoute = allowedAdditionalRoutes.indexOf(routeData.toState.name) === -1;

            // user can go to courses/lessons without check
            if (isNotAdditionalRoute) {
                routeData.event.preventDefault();

                $state.go(signupRoute.name);
            }
        }
    }

    /**
     * Get only states related to signup process
     * @param user
     * @returns {Object}
     */
    function getSignupRoutes(user) {
        var routes = $state.get();
        var step = user.registrationStep;
        var currentSignupRoute = {};

        // principal don't pass any step
        if (!step) {
            return currentSignupRoute;
        }

        // principal finished signup process
        if (step >= appConstants.PRINCIPAL_REGISTRATION_STEPS.CONFIRMATION.step) {
            return currentSignupRoute;
        }

        _.forEach(routes, function (route) {
            // routes with registration steps
            if (route.data && route.data.registrationStep) {

                // get route with last not passed step
                if (route.data.registrationStep === (step + 1)) {
                    currentSignupRoute = route;
                }
            }
        });

        return currentSignupRoute;
    }
}