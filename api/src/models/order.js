const { DataTypes } = require ('sequelize');    

module.exports = ( sequelize ) => {
    sequelize.define( "order" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM("carrito","creada","procesada","cancelada","completada"),
            defaultValue: "carrito",
            allowNull:false
        },
        total:{
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            allowNull:false
        },
        adress:{
            type: DataTypes.STRING,
            defaultValue: "no address",
            allowNull:false
        },
        date:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    })
}