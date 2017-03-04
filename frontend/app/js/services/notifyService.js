'use strict';

function NotifyService(toaster) {

    function showNotification(params) {
        var message = (params.data &&  params.data.message) || params.message || params.statusText;


        // message with stripe errors
        if ( params.error && params.error.message ) {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: params.error.message,
                showCloseButton: true,
                timeout: 3500
            });

            return;
        }

        switch (params.status) {
            case 200:
                toaster.pop({
                    type: 'success',
                    title: 'Success',
                    body: message,
                    showCloseButton: true,
                    timeout: 3500
                });

                break;

            case 400:
            case 401:
            case 404:
            case 500:
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: message,
                    showCloseButton: true,
                    timeout: 3500
                });

                break;

            default:
                toaster.pop({
                    type: 'info',
                    title: 'Information',
                    body: message,
                    showCloseButton: true,
                    timeout: 3500
                });

                break;
        }
    }

    return showNotification;
}

angular.module('Educ8')
    .service('notifyService', ['toaster', NotifyService]);



