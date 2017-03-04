"use strict";

angular.module('Educ8')
        .service('ngDialogService', ngDialogService);

/**ngInject*/
function ngDialogService(ngDialog) {

    function DialogBox() {}

    angular.extend(DialogBox.prototype, {
        open: open,
        close: close,
        closeAll: closeAll
    });

    return new DialogBox();

    function open(params) {
        ngDialog.open(params);
    }

    function close() {
        ngDialog.close();
    }

    function closeAll() {
        ngDialog.closeAll();
    }
}