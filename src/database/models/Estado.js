module.exports = (sequelize, dataTypes) => {
    let alias = 'Estados';
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
        tableName: 'estados',
        timestamps: false
    };
    const Estado = sequelize.define(alias, cols, config)
    Estado.associate = function(models) {
        Estado.hasMany(models.Usuarios, {
                as : 'usuarios',                
                foreignKey: 'estadosId',
                timestamps: false
        });
};
    return Estado
}