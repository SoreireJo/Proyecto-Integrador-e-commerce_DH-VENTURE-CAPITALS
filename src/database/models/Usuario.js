module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';
    let cols = {
        usuarioId: {
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
        ultimaActualizacion: dataTypes.DATE
    };
    let config = {
        tableName: 'usuarios',
        timestamps: false
    };
        
    
    const Usuario = sequelize.define(alias, cols, config)
   
    Usuario.associate = function(models) {

Usuario.belongsTo(models.Compras, {
    as : 'compra',
    foreignKey: 'comprasId',
    timestamps: false
});
        Usuario.hasMany(models.Localidad, {
            as : 'localidad',
            foreignKey: 'localidadId',
            timestamps: false
    });
    Usuario.belongsToMany(models.Productos, {
        as : 'producto',
        through: 'usuariosProductos',
        foreignKey: 'productoId',
        timestamps: false
});
};
    return Usuario;
}
