module.exports = (sequelize, dataTypes) => {
    let alias = 'Provincia';
    let cols = {
        provinciaId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        provincia: {
            type: dataTypes.STRING
        },
        paisId: {
            type: dataTypes.INTEGER
        },
        ultimaActualizacion: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'provincia',
        timestamps: false
    };
    const Provincia = sequelize.define(alias, cols, config)
    //Provincia a localidad 1:N
    Provincia.associate = function(models) {
        Provincia.belongTo(models.Localidad, { 
            as: "localidad",
            foreignKey: "localidadId"
        })
    //Provincia a Pais N:1
        Provincia.hasMany(models.Pais,{
            as: "pais",
            foreignKey: "paisId"
        })
    
}
    
    return Provincia
}