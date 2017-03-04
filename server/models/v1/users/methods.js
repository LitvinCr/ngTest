"use strict";

module.exports = {
    associate: function (models) {

    },
    /*<====== CONSTANTS ======>*/
    /**
     * roles constants
     * @returns {{SCHOOLBOY: number, TEACHER: number, PRINCIPAL: number, ADMIN: number}}
     * @constructor
     */
    ROLE: function () {
        return {
            USER: 1,
            ADMIN: 2
        }
    }
};