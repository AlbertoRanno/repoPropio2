module.exports = { 
  "development": {
    "username": "root",
    "password": null, //reemplazar por la contraseña si la tuviera
    "database": "laca_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":"3306" //puerto agregado a mano, para especificar que sea el mismo del XAMPP
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
