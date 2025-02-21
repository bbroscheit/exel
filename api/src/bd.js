require('dotenv').config();

const { Sequelize, Op } = require ( 'sequelize');
const fs = require ( 'fs' );
const path = require ( 'path' );
const { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT} = process.env

const sequelize = new Sequelize(`postgres://${DB_HOST}:${DB_PASSWORD}@${DB_USER}:${DB_PORT}/exel` , {
    logging : false,
    native: false,
    // timezone: '-03:00'
});

const basename = path.basename ( __filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners

fs.readdirSync( path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0 ) && ( file !== basename ) && (file.slice(-3) === '.js'))
    .forEach((file) => {modelDefiners.push(require(path.join(__dirname, '/models', file)))
    })

// Injectamos la conexion (sequelize) a todos los modelos

modelDefiners.forEach( model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: user => User

let entries = Object.entries(sequelize.models);
let capEntries = entries.map((entry) => [entry [0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capEntries);

// En sequelize.models están todos los modelos importados como propiedades para relacionarlos hacemos un destructuring

const { Article,
        Category,
        Order,
        Subcategory,
        User, 
        Orderitem
         } = sequelize.models;

// Relacionamos las tablas
// seccion de Soportes

Order.belongsToMany(Article, { through: Orderitem });
Article.belongsToMany(Order, { through: Orderitem });

// Relación uno a muchos entre Category y Article
Category.hasMany(Article);
Article.belongsTo(Category);

// Relación uno a muchos entre Category y Subcategory
Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

// Relación uno a muchos entre Subcategory y Article
Subcategory.hasMany(Article);
Article.belongsTo(Subcategory);

// Relación uno a muchos entre User y Order
User.hasMany(Order);
Order.belongsTo(User);


// Autenticamos y conectamos

sequelize.authenticate()
    .then(() => console.log('Database Connected'))
    .catch( err => console.log(err))

// exportamos los modelos y la conexion de Sequelize

module.exports = {
    ...sequelize.models,
    sequelize,
    conn: sequelize,
    Op
}
