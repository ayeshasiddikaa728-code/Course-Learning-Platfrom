const { Pool } = require('pg');

class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }
  }

  getInstance() {
    return Database.instance;
  }
}

const dbInstance = new Database();
Object.freeze(dbInstance);

module.exports = dbInstance.getInstance();