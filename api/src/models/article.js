const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( "article" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            defaultValue: " description sin definir ",
            allowNull:false
        },
        stock:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull:false
        },
        image:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}