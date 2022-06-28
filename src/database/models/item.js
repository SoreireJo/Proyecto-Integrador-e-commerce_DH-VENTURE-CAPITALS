module.exports = (sequelize, dataTypes) => {
    let alias = "Items";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        precio:dataTypes.DECIMAL, 
        cantidad:dataTypes.INTEGER,
        subtotal:dataTypes.DECIMAL,
        estado: dataTypes.INTEGER
    };
    
    let config = {
        tableName: 'item',
        timestamps: false
    };
    const Item = sequelize.define(alias, cols, config)
    
    Item.associate = function (models) {
        Item.belongsTo(models.Compras, {
            as: "compras",
            foreignKey: "compraId",
          });
        Item.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "userId",
          });
        Item.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "productId",
          });
    };

    return Item;
}