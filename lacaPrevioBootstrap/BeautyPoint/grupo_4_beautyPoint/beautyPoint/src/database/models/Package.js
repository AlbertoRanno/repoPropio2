module.exports = (sequelize, DataTypes) => {
  let alias = 'Package';
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING(50),
    },
    status: {
      type: DataTypes.INTEGER,
    },
  };
  let config = {
    tableName: 'packages',
    timestamps: true,
  };

  const Package = sequelize.define(alias, cols, config);

  Package.associate = function (models) {
    // recibe todos los modelos que tenemos
    //aquí defino cómo son esas asociaciones
    Package.hasMany(models.Product, {
      // ok
      // 1 a Muchos
      //un tipo de paquete tiene muchos productos./ Le digo con que tabla se relaciona
      as: 'productosP', // un alias para llamar la relación,
      foreignKey: 'package_id', // Cuál es la columna de la bbdd que une a éstas 2 tablas. No importa donde estamos parados
    });
  };

  return Package;
};
