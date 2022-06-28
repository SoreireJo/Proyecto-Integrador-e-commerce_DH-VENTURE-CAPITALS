module.exports = (sequelize, dataTypes) => {
    let alias = 'Productos';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        descripcion: dataTypes.STRING,
        precio: dataTypes.DECIMAL,
        stock: dataTypes.INTEGER,
        imagen: dataTypes.STRING,
        descuento: dataTypes.INTEGER,
        ultimaActualizacion: dataTypes.DATE
    };
    let config = {
        tableName: 'productos',
        timestamps: false
    };


    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = function (models) {
        Producto.belongsTo(models.Categorias, {
            as: 'categorias',
            foreignKey: 'categoriaId',
            timestamps: false
        });
        Producto.belongsTo(models.Promos, {
            as: 'promos',
            foreignKey: 'promoId',
            timestamps: false
        });
        Producto.belongsTo(models.Usuarios, {
            as: 'usuarios',
            foreignKey: 'usuarioId',
            timestamps: false
        });
        Producto.hasMany(models.Items, {
            as: "items",
            foreignKey: "productId"
        })
    };
    return Producto;
}
