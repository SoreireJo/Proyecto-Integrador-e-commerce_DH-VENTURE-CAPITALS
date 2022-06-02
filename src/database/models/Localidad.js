module.exports = (sequelize, dataTypes) => {
    let alias = 'Localidad';
    let cols = {
        localidadId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        localidad: {
            type: dataTypes.STRING
        },
        provinciaId: {
            type: dataTypes.INTEGER
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
        //Localidad a Direccion 1:N
        Localidad.belongsTo(models.Usuarios, { 
            as: "usuario",
            foreignKey: "usuarioId"
        })
        //Localidad a Provincia N:1
        Localidad.hasMany(models.Provincia,{
            as: "provincia",
            foreignKey: "provinciaId"
        })
    
}
    
    return Localidad
}