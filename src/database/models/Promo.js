module.exports = (sequelize, dataTypes) => {
    let alias = 'Promos';
    let cols = {
        id: {
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
        Promo.hasMany(models.Productos, {
                as : 'productos',                
                foreignKey: 'promoId',
                timestamps: false
        });
};
    return Promo
}