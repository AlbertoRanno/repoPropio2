module.exports = (sequelize, DataTypes) => {
  let alias = 'Product'; // apodo de la tabla
  let cols = {
    // columnas de la base de datos
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    price: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    discount: {
      // ESTÁ COMO NO OBLIGATORIO EN LA BASE DE DATOS
      type: DataTypes.FLOAT,
    },
    package_id: {
      type: DataTypes.INTEGER,
      references: {
        // IMPORTANTE!!
        model: "Package",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        // IMPORTANTE!!
        model: "Category",
        key: "id",
      },
    },
    image: {
      type: DataTypes.STRING(50),
    },
    stock: {
      type: DataTypes.INTEGER,
    } /*
    createdAt: {             // NO HACEN FALTA 
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },*/,
    status: {
      type: DataTypes.INTEGER,
    },
    vendedor_id: {
      type: DataTypes.INTEGER,
    },
  };
  let config = {
    tableName: 'products', // nombre de la tabla
    timestamps: true,
  };

  const Product = sequelize.define(alias, cols, config);

  //Cada vez que quiero hablar de una relación lo haré luego de define. Como una "asociación"
  Product.associate = function (models) {
    // recibe todos los modelos que tenemos
    //aquí defino cómo son esas asociaciones:

    Product.belongsTo(models.Category, { // hasOne
      // ok
      // Muchos a 1
      //cada producto pertenece a usa sola categoria./ Le digo con que tabla se relaciona
      as: 'categories', // un alias para llamar la relación,
      foreignKey: 'category_id', // Cuál es la columna de la bbdd que une a éstas 2 tablas
    });

    Product.belongsTo(models.Package, {
      // ok
      // Muchos a 1
      //cada producto tiene un package específico./ Le digo con que tabla se relaciona
      as: 'packages', // un alias para llamar la relación,
      foreignKey: 'package_id', // Cuál es la columna de la bbdd que une a éstas 2 tablas
    });

    Product.belongsTo(models.User, {
      // ok
      // Muchos a 1 (el admin)  // 1er parámetro, el modelo al que asocio
      as: "users", //alias
      foreignKey: "vendedor_id", //Cuál es la columna de la bbdd que une a éstas 2 tablas
      //timestamps: true, //False en caso de que, la tabla pivot, no tenga createdAt y updatedAt
    });
  };

  return Product;
};
