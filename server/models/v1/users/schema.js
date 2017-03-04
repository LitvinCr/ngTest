"use strict";

module.exports = function(sequelize, DataTypes){
    return {
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        role: {
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.STRING
        },
        facebookId: {
            type: DataTypes.INTEGER,
            field: 'facebook_id'
        },
        refreshToken: {
            type: DataTypes.INTEGER,
            field: 'refresh_token'
        },
        registrationStep: {
            type: DataTypes.INTEGER,
            field: 'registration_step'
        },
        countrySettingsId: {
            type: DataTypes.INTEGER,
            field: 'country_settings_id'
        },
        schoolsId: {
            type: DataTypes.INTEGER,
            field: 'schools_id'
        },
        classId: {
            type: DataTypes.INTEGER,
            field: 'class_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }
};