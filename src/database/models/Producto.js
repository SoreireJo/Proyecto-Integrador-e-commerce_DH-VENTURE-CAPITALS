module.exports = (sequelize, dataTypes) => {
    let alias = 'Productos';
    let cols = {
        productoId: {
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

    Producto.associate = function(models) {
        Producto.belongsToMany(models.Categorias, {
                as : 'categoria',
                through: 'categoriasproductos',
                foreignKey: 'productoId',
                otherKey: 'categoriaId',
                timestamps: false
        });
        Producto.belongsToMany(models.Promos, {
            as : 'promo',
            through: 'productospromos',
            foreignKey: 'productoId',
            otherKey: 'promoId',
            timestamps: false
    });
        Producto.hasMany(models.Compras, {
            as : 'compras',
            foreignKey: 'comprasId',
            timestamps: false
    });
    Producto.belongsToMany(models.Usuarios, {
        as : 'usuario',
        through: 'usuariosProductos',
        foreignKey: 'usuarioId',
        timestamps: false
});
};
    return Producto;
}
