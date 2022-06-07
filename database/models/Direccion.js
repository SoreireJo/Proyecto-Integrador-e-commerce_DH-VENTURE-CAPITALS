module.exports = (sequelize, dataTypes) => {
    let alias = 'Direcciones';
    let cols = {
        direccionId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        calle: {
            type: dataTypes.STRING
        },
        codigoPostal: {
            type: dataTypes.INTEGER
        },
        telefono: {
            type: dataTypes.INTEGER
        },
        ultimaActualizacion: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'direccion',
        timestamps: false
    };
    const Direccion = sequelize.define(alias, cols, config)
    /* Direccion.associate = function (models) {
        //Direaccion a Localidad N:1
        Direccion.hasMany(models.localidad, { 
            as: "localidad",
            foreignKey: "localidadId"
    }) 
    //Direccion a Clientes/Usuarios 1:N
    
    }
    */
    return Direccion
}