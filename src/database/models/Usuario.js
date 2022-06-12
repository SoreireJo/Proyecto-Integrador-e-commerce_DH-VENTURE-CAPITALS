module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombres: dataTypes.STRING,
        apellidos: dataTypes.STRING,
        imagen: dataTypes.STRING,
        email: dataTypes.DECIMAL,
        activo: dataTypes.INTEGER,
        nombreUsuario: dataTypes.INTEGER,
        claveIngreso:dataTypes.INTEGER,
        telefono:dataTypes.STRING,
        codigoPostal:dataTypes.STRING,
        direccion:dataTypes.STRING,
        dni:dataTypes.INTEGER,
        fechaCreacion: dataTypes.DATE
    };
    let config = {
        tableName: 'usuarios',
        timestamps: false
    };
        
    
    const Usuario = sequelize.define(alias, cols, config)
   
    Usuario.associate = function(models) {

        Usuario.hasMany(models.Compras, {
            as : 'compras',
            foreignKey: 'usuarioId',
            timestamps: false
        });
        Usuario.belongsTo(models.Roles, {
            as : 'roles',
            foreignKey: 'rolesId',
            timestamps: false
        });
        Usuario.belongsTo(models.Localidad, {
                as : 'localidad',
                foreignKey: 'localidadId',
                timestamps: false
        });
        Usuario.hasMany(models.Productos, {
            as : 'productos',
            foreignKey: 'usuarioId',
            timestamps: false
    });

};
    return Usuario;
}
