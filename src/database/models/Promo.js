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
        tableName: 'Promos',
        timestamps: false
    };
    const Promo = sequelize.define(alias, cols, config)
    return Promo
}