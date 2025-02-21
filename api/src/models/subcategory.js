const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('subcategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'nombre de subcategoria sin definir',
            allowNull: false
        },
        isdelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}