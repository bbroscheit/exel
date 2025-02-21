const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( "category" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            defaultValue: " nombre de categoria sin definir ",
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }})
}