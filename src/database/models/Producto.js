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

    Producto.associate = function(models) {
        Producto.hasMany(models.Categorias, {
                as : 'categorias',
                foreignKey: 'id',
                timestamps: false
        });
        Producto.hasMany(models.Promos, {
            as : 'promos',
            foreignKey:'id',
            timestamps: false
    });
        Producto.belongsTo(models.Compras, {
            as : 'compras',
            foreignKey: 'productoId',
            timestamps: false
    });
    Producto.hasMany(models.Usuarios, {
        as : 'usuarios',
        foreignKey: 'id',
        timestamps: false
});
};
    return Producto;
}
