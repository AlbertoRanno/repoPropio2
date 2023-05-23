module.exports = (sequelize, DataTypes) => {
  let alias = 'User';
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    dni: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING(320),
    },
    categoria: {
      // valor 0-Admin / 1-Comprador
      type: DataTypes.TINYINT(1),
    },
    avatar: {
      type: DataTypes.STRING(400),
    },
    password: {
      type: DataTypes.STRING(400),
    } /*
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },*/,
    status: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.STRING(50),
    },
  };
  let config = {
    tableName: 'users',
    timestamps: true,
  };

  const User = sequelize.define(alias, cols, config);

  //Cada vez que quiero hablar de una relación lo haré luego de define. Como una "asociación"
  User.associate = function (models) {
    // recibe todos los modelos que tenemos
    //aquí defino cómo son esas asociaciones:

    User.hasMany(models.Product, {
      // 1 a Muchos
      // 1er parámetro, el modelo al que asocio
      as: "productosU", //alias
      foreignKey: "vendedor_id", //Cuál es la columna de la bbdd que une a éstas 2 tablas
    });
  };

  return User;
};
