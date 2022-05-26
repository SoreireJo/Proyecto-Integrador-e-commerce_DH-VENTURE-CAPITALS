module.exports = (sequelize, dataTypes) => {
    let alias = 'Pais';
    let cols = {
        paisId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pais: {
            type: dataTypes.STRING
        },
        ultimaActualizacion: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'pais',
        timestamps: false
    };
    const Pais = sequelize.define(alias, cols, config)
    Pais.associate = function(models) {
         //Pais a Provincia 1:N
        Pais.belongTo(models.Provincia, { 
            as: "provincia",
            foreignKey: "provinciaId"
        })   
}
    
    return Pais
}