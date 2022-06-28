module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorias';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        // ultimaActualizacion: {
        //     type: dataTypes.DATE
        // }
    };
    let config = {
        tableName: 'categorias',
        timestamps: false
    };
    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = function(models) {
        Categoria.hasMany(models.Productos, {
                as : 'productos',
                foreignKey: 'categoriaId',
                timestamps: false
        });
};
    return Categoria
}