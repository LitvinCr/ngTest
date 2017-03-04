function DataTable ($location, $uibModal) {
    return {
        initialize: function (modelService, params) {
            var scope = this;

            scope.dataSetReady = false;

            var method = 'getList';
            var requestId = null;
            var formatter = null;

            if ( params ) {
                if ( params.methodName ) {
                    method = params.methodName;
                }

                if ( params.id ) {
                    requestId = params.id;
                }

                if ( params.formatter ){
                    formatter = params.formatter;
                }
            }

            scope.getList = function (refresh) {
                if (refresh) {
                    scope.filters = {
                        q: '',
                        offset: 0,
                        limit: 25,
                        order_field: null,
                        order_type: null
                    };
                    $location.search('')
                }

                modelService[method](scope.filters, requestId)
                    .success(function (data) {
                        if (refresh) {
                            scope.totalWithoutFilters = data.total;
                        }
                        scope.total = data.payload.count;
                        scope.items = data.payload.list;

                        if (formatter && typeof formatter === 'function'){
                            formatter(scope.items)
                        }

                        if (!refresh) {
                            $location.search(scope.filters);
                        }
                        scope.dataSetReady = true;
                    })
            };

            var search = $location.search();
            var refresh = true;

            if (Object.keys(search).length) {
                scope.filters = {
                    q: search.q,
                    offset: parseInt(search.offset),
                    limit: parseInt(search.limit),
                    order_field: search.order_field,
                    order_type: search.order_type
                };
                refresh = false;
            } else {
                scope.filters = {
                    q: '',
                    offset: 0,
                    limit: 25,
                    order_field: null,
                    order_type: null
                };
            }

            scope.total = 0;
            scope.items = [];

            scope.getList(refresh);


            scope.askDelete = function (id, deleteMethod) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/common/modal_confirm.html',
                    size: 'sm'
                });

                var modelDestroyMethod = deleteMethod || 'delete';


                modalInstance.result
                    .then(function () {
                        modelService[modelDestroyMethod](id)
                            .success(function () {
                                scope.getList(true);
                            });
                    })
            };
        }
    }
}

angular.module('Educ8')
    .service('DataTable', DataTable);

