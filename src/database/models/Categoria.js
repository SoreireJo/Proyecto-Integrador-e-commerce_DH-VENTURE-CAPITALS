module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorias';
    let cols = {
        categoriaId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        ultimaActualizacion: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'categorias',
        timestamps: false
    };
    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = function(models) {
        Categoria.belongsToMany(models.Productos, {
                as : 'productos',
                through: 'categoriasproductos',
                foreignKey: 'categoriaId',
                otherKey:'productoId',
                timestamps: false
        });
};
    return Categoria
}