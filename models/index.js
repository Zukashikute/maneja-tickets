const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.googleUsers = require('./googleUsers.js')(mongoose);
db.users = require('./users.js')(mongoose);
db.resolution = require('./resolution.js')(mongoose);
db.tickets = require('./tickets.js')(mongoose);



module.exports = db;