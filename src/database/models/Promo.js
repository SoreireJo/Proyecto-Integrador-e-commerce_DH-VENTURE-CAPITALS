module.exports = (sequelize, dataTypes) => {
    let alias = 'Promos';
    let cols = {
        promoId: {
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
        tableName: 'promos',
        timestamps: false
    };
    const Promo = sequelize.define(alias, cols, config)
    Promo.associate = function(models) {
        Promo.belongsToMany(models.Productos, {
                as : 'productos',
                through: 'productospromos',
                foreignKey: 'promoId',
                otherKey:'productoId',
                timestamps: false
        });
};
    return Promo
}