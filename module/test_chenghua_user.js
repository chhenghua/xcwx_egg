'use strict'

const Sequelize = require('cu8-sequelize-oracle')

module.exports = (sequelize) => {
    return sequelize.define(__filename.substr(__dirname.length + 1).split('.')[0], {
        _id: {
            type: Sequelize.STRING(32),
            primaryKey: true,
            comment: "主键"
        },
        username: {
            type: Sequelize.STRING(16),
            allowNull: false,
            comment: "用户名"
        },
        gender: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: "性别"
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        paranoid: true,
        underscored: true,
        classMethods: {}
    })
}
