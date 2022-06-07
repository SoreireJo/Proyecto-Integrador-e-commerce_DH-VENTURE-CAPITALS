module.exports = (sequelize, dataTypes) => {
    let alias = 'Localidad';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        localidad: {
            type: dataTypes.STRING
        },
        
        ultimaActualizacion: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'localidad',
        timestamps: false
    };
    const Localidad = sequelize.define(alias, cols, config)
    Localidad.associate = function (models) {
        
        Localidad.belongsTo(models.Usuarios, { 
            as: "usuarios",
            foreignKey: "localidadId"
        })
        
        Localidad.hasMany(models.Provincia,{
            as: "provincia",
            foreignKey: "provinciaId"
        })
    
}
    
    return Localidad
}