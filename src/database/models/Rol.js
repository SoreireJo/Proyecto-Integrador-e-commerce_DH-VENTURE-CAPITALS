module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: dataTypes.STRING
        },
        create_time: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'roles',
        timestamps: false
    };
    const Rol = sequelize.define(alias, cols, config)
    Rol.associate = function(models) {
        Rol.belongsTo(models.Usuarios, {
                as : 'usuarios',                
                foreignKey: 'rolesId',
                timestamps: false
        });
};
    return Rol
}