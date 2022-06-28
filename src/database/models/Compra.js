module.exports = (sequelize, dataTypes) => {
    let alias = 'Compras';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nroCompra: dataTypes.INTEGER,
        total: dataTypes.INTEGER,
        fechaCreacion: dataTypes.DATE
    };
    let config = {
        tableName: 'compras',
        timestamps: false
    };


    const Compra = sequelize.define(alias, cols, config)
    
    Compra.associate = function (models) {
       
        Compra.belongsTo(models.Usuarios, {
            as: 'usuarios',
            foreignKey: 'usuarioId',
            timestamps: false
        });
        Compra.hasMany(models.Items, { 
            as: "items",
            foreignKey: "compraId",
            timestamps: false
        })
    };
    return Compra;
}
