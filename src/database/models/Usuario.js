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

Usuario.belongsTo(models.Compras, {
    as : 'compras',
    foreignKey: 'usuarioId',
    timestamps: false
});
        Usuario.hasMany(models.Localidad, {
            as : 'localidad',
            foreignKey: 'id',
            timestamps: false
    });
    Usuario.belongsTo(models.Productos, {
        as : 'productos',
        foreignKey: 'productoId',
        timestamps: false
});
Usuario.hasMany(models.Roles, {
    as : 'roles',
    foreignKey: 'id',
    timestamps: false
});
};
    return Usuario;
}
