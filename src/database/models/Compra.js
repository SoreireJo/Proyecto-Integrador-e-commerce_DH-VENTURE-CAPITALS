module.exports = (sequelize, dataTypes) => {
    let alias = 'Compras';
    let cols = {
        comprasId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        precio: dataTypes.INTEGER,
        total: dataTypes.INTEGER,
        cantidad: dataTypes.INTEGER,
        fechaCreacion: dataTypes.DATE
    };
    let config = {
        tableName: 'compras',
        timestamps: false
    };


    const Compra = sequelize.define(alias, cols, config)
    
    Compra.associate = function (models) {
        Compra.hasMany(models.Usuarios, {
            as: 'usuarios',
            foreignKey: 'usuarioId',
            timestamps: false
        });
        Compra.hasMany(models.Productos, {
            as: 'producto',
            foreignKey: 'productoId',
            timestamps: false
        });
    };
    return Compra;
}
