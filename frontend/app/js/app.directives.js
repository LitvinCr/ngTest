/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function (scope, element) {
            var listener = function (event, toState, toParams, fromState, fromParams) {
                var title = '';

                if (toState.data && toState.data.pageTitle) {
                    title = 'Educ8 | ' + toState.data.pageTitle;

                    $rootScope.pageTitle = toState.data.pageTitle || '';
                }

                $timeout(function () {
                    element.text(title);
                });
            };

            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * return school avatar
 */
function getSchoolAvatar($rootScope, appConstants) {
    return {
        replace: true,
        restrict: 'EA',
        scope: {
            size: '@size'
        },
        template: "<img class='top-avatar' title='{{getSchoolName()}}' ng-src='{{getUrl()}}'>",
        link: function (scope, element) {
            var size = '';

            if (scope.size) {
                size = scope.size + 'x' + scope.size + '_';
            }

            scope.getUrl = function () {
                var school = $rootScope.profile.school;

                if (!school.avatar) {
                    return '../images/default-photo.jpeg';
                }

                return appConstants.S3_PATCH + 'school/' + school.id + '/' + size + school.avatar;
            };

            scope.getSchoolName = function () {
                return $rootScope.profile.school.name;
            }
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function () {
                element.metisMenu();
            });
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function () {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')) {
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/**
 * get icon
 */
function getIcon(appConstants) {
    return {
        replace: true,
        restrict: 'EA',
        template: '<img ng-src="{{getIconScr()}}" title="{{title}}">',
        scope: {
            iconSrc: '=',
            iconObjId: '@',
            iconObject: '@',
            iconSize: '@',
            iconTitle: '@'
        },
        link: function (scope, element, attrs) {

            scope.title = scope.iconTitle;
            scope.getIconScr = function () {
                var fullUrl = '';
                if (scope.iconSrc != undefined) {
                    fullUrl = appConstants.SERVER_URL + 'icon/' + scope.iconObject + '/' + scope.iconObjId + '/' + scope.iconSize + '/' + scope.iconSrc;
                } else {
                    fullUrl = appConstants.DEFAULT_DIR_icon + scope.iconSize + appConstants.DEFAULT_icon;
                }
                return fullUrl;
            }
        }
    }
}

function onlyNumbers() {
    return {
        require: "ngModel",
        restrict: "A",
        link: function (scope, elem, attrs, ngModelCtrl) {
            angular.element(elem).bind("keyup keypress input paste change", function (e) {
                var charCode = (e.which) ? e.which : e.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
            });
        }
    }
}

function formatDate() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ngModelCtrl) {
            angular.element(el).bind("keyup keypress", function (e) {

                var backspace = e.which;
                var val = ngModelCtrl.$viewValue;

                var regExp = /(\d{2})(\d{2})/;

                if (/[\/]/.test(val)) {
                    return val;
                } else if (!/[\/]/.test(val) && backspace === 8) {
                    return val;
                } else {
                    if (!val) return;
                    val = val.replace(/\d{2}/, function (match, i, s) {
                        return match + '/' + s.substr(2);
                    });
                }

                ngModelCtrl.$setViewValue(val);
                ngModelCtrl.$render();
            })
        }
    }
}

function resizeFrame() {
    return {
        restrict: 'A',
        link: function (scope, el) {
            var win = angular.element(window);
            var videoFrame = angular.element(el);
            var videoWidth = videoFrame[0].offsetWidth;
            var videoHeight;

            videoFrame.css('height', videoWidth / 1.82);

            win.on('resize orientationchange', function () {
                videoWidth = videoFrame[0].offsetWidth;

                videoHeight = videoFrame.css('height', videoWidth / 1.82)
            })
        }
    }

}

function DT_itemsPerPage() {
    return {
        restrict: 'A',
        templateUrl: 'views/common/dataTables/items_on_page.html',
        controller: function ($scope) {
            $scope.options = [10, 25, 50, 100];
        }
    }
}

function DT_Pagination() {
    return {
        restrict: 'A',
        templateUrl: 'views/common/dataTables/pagination.html',
        controller: function ($scope) {
            $scope.$watch('total', fillPagesArray);
            $scope.selectedPage = 1;
            $scope.totalPages = 0;

            $scope.setPage = function (pageNum) {
                if (pageNum < 1 || pageNum > $scope.totalPages || pageNum == $scope.selectedPage) {
                    fillPagesArray();
                    return false;
                }

                $scope.selectedPage = pageNum;
                fillPagesArray();
                $scope.filters.offset = $scope.filters.limit * (pageNum - 1);
                $scope.getList();
            };

            $scope.$watch('filters.limit', function () {
                $scope.setPage(1);
            });

            function fillPagesArray(now, prev) {
                if (now !== prev) {
                    $scope.selectedPage = 1;
                }

                $scope.pagesArray = [];
                $scope.totalPages = Math.ceil($scope.total / $scope.filters.limit);
                $scope.pagesArray.push($scope.selectedPage);

                var pushedPagesLeft = 3;
                var unshiftedPagesLeft = 3;
                var unshiftedPage = $scope.selectedPage - 1;
                var pushedPage = $scope.selectedPage + 1;

                if ($scope.selectedPage > $scope.totalPages / 2) {
                    while (pushedPage <= $scope.totalPages && pushedPagesLeft > 0) {
                        $scope.pagesArray.push(pushedPage);
                        pushedPage++;
                        pushedPagesLeft--;
                    }
                    unshiftedPagesLeft += pushedPagesLeft;

                    while (unshiftedPage > 0 && unshiftedPagesLeft > 0) {
                        $scope.pagesArray.unshift(unshiftedPage);
                        unshiftedPage--;
                        unshiftedPagesLeft--;
                    }


                } else {
                    while (unshiftedPage > 0 && unshiftedPagesLeft > 0) {
                        $scope.pagesArray.unshift(unshiftedPage);
                        unshiftedPage--;
                        unshiftedPagesLeft--;
                    }
                    pushedPagesLeft += unshiftedPagesLeft;

                    while (pushedPage <= $scope.totalPages && pushedPagesLeft > 0) {
                        $scope.pagesArray.push(pushedPage);
                        pushedPage++;
                        pushedPagesLeft--;
                    }
                }
            }
        }
    }
}


function DT_Search() {
    return {
        restrict: 'A',
        templateUrl: 'views/common/dataTables/search.html',
        controller: function ($scope) {
            $scope.search = function () {
                $scope.filters.offset = 0;
                $scope.getList();
            }
        }
    }
}

function DT_Order() {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            var sortType = 'desc';
            $element.addClass('sortable');
            $element.on('click', function () {
                $('.sortable').removeClass('sorting_desc sorting_asc');
                sortType = sortType == 'desc' ? 'asc' : 'desc';
                $element.addClass('sorting_' + sortType);
                $scope.filters.order_type = sortType;
                $scope.filters.order_field = $element.data('field');

                $scope.getList();
            });
        }
    }
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('Educ8')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('getIcon', getIcon)
    .directive('onlyNumbers', onlyNumbers)
    .directive('formatDate', formatDate)
    .directive('resizeFrame', resizeFrame)
    .directive('itemsOnPage', DT_itemsPerPage)
    .directive('tablePagination', DT_Pagination)
    .directive('tableSearch', DT_Search)
    .directive('orderingColumn', DT_Order)
    .directive('schoolAvatar', getSchoolAvatar);
