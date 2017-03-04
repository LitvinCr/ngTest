"use strict";

module.exports = function () {
    function base(data) {
        function userStructure(item) {
            item = item.dataValues;
            return {
                id: item.id,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                token: item.token,
                tokenExpiresAt: item.tokenExpiresAt,
                refreshToken: item.refreshToken,
                role: item.role,
                school: item.school || null,
                class: item.class || null,
                registrationStep: item.registrationStep || 0
            }
        }

        // when data - array with models
        if (Array.isArray(data)) {
            let result = data.map(function (user) {
                return userStructure(user);
            });

            return result;
        }

        return userStructure(data);
    }
    function short(data) {
        function userStructure(item) {
            item = item.dataValues;
            return {
                id: item.id,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                online: item.online,
                role: item.role,
                registrationStep: item.registrationStep || 0,
                school: item.school || null,
                class: item.class || null,
                countrySetting: item.countrySetting || null
            }
        }

        // when data - array with models
        if (Array.isArray(data)) {
            let result = data.map(function (user) {
                return userStructure(user);
            });

            return result;
        }

        return userStructure(data);
    }
    return {
        base: base,
        short: short
    }
};