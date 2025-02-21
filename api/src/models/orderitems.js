const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orderitem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};