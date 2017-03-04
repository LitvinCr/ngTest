angular.module('Educ8-filters', [])
    .filter('formatDate', [function () {
        return function (date) {
            return moment(date).format("DD.MM.YYYY");
        };
    }])


    .filter('trustUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        }
    }])
    .filter('getYoutubeLink', ['$sce', function ($sce) {
        return function (id) {
            return $sce.trustAsResourceUrl('https://www.youtube.com/watch?v=' + id);
        }
    }])

    .filter('timeDiff', [function () {
        return function (startTime, endTime) {
            var start = moment(startTime, 'hh:mm:ss');
            var end = moment(endTime, 'hh:mm:ss');

            var hrs = end.diff(start, 'hours');
            var mins = end.diff(start, 'minutes');
            var clearMinutes = mins % 60;

            var result = clearMinutes + 'min';

            // add hours to result string
            if (hrs > 0) {
                result = hrs + 'h ' + result;
            }

            return result;
        };
    }])

    .filter('truncate', [function () {
        return function (text, length, end) {
            if (!text) {
                return;
            }

            if (isNaN(length))
                length = 100;

            if (end === undefined)
                end = "...";

            if (text.length <= length) {
                return text;
            } else {
                return String(text).substring(0, length) + end;
            }
        };
    }])

    .filter('getPdfUrl', ['appConstants', '$rootScope', function (appConstants, $rootScope) {
        return function (lesson) {
            return appConstants.S3_PATCH + 'lesson/' + lesson.id + '/' + lesson.planUrl;
        }
    }])


    .filter('userRole', ['appConstants', function (appConstants) {
        // Transform int role into readable format
        return function (role) {
            return appConstants.ROLES[role - 1];
        }
    }])

    .filter('subscriptionType', ['appConstants', function (appConstants) {
        return function (school) {
            var SUBSCRIPTION_TYPE = appConstants.SUBSCRIPTION_TYPE;

            switch (school.subscriptionType) {
                case SUBSCRIPTION_TYPE.FULL:
                    return 'Full access';

                case SUBSCRIPTION_TYPE.TRIAL:
                    return 'Trial access';

                case SUBSCRIPTION_TYPE.LIMITED:
                    return 'Limited access';
            }
        }
    }])

    .filter('currencyFlag', [function () {
        return function (currency) {
            var currencyFlag = '';

            switch (currency) {
                case "GBP":
                    currencyFlag = '£';
                    break;
                case "EUR":
                    currencyFlag = '€';
                    break;
                default:
                    currencyFlag = '€'
            }

            return currencyFlag;
        }
    }])

    .filter('roleName', ['appConstants', function (appConstants) {

        return function (role) {

            var roleName = '';

            switch (role) {
                case appConstants.ROLES.ADMIN:
                    roleName = 'Admin';
                    break;
                case appConstants.ROLES.PRINCIPAL:
                    roleName = 'Principal';
                    break;
                case appConstants.ROLES.TEACHER:
                    roleName = 'Teacher';
                    break;
                case appConstants.ROLES.STUDENT:
                    roleName = 'Student';
                    break;
                default:
                    roleName = 'Not valid role'
            }

            return roleName;
        }
    }])

    .filter('dataURItoBlob', [function () {
        return function (dataURI, fileName) {
            var binary = atob(dataURI.split(',')[1]);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            var blobImg = new Blob([new Uint8Array(array)], {type: 'image/png'});
            blobImg.lastModifiedDate = new Date();
            blobImg.name = fileName;

            return blobImg;
        };
    }])

    .filter('searchBy', [function () {
        return function (input, param, val) {
            var output = [];
            if (!val || val.length <= 2) {
                return input;
            }
            input.forEach(function (item) {
                if (item[param].indexOf(val) !== -1) {
                    output.push(item);
                }
            });
            return output;
        }
    }]);

