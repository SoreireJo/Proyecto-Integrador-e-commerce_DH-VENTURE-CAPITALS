module.exports = (sequelize, dataTypes) => {
    let alias = 'Compras';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        precio: dataTypes.INTEGER,
        descuento: dataTypes.INTEGER,
        cantidad: dataTypes.INTEGER,
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
        Compra.belongsTo(models.Productos, {
            as: 'productos',
            foreignKey: 'productoId',
            timestamps: false
        });
    };
    return Compra;
}
