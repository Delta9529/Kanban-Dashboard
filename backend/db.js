const initSqlJs = require("sql.js");
const fs = require("fs");

const DB_FILE = "./tasks.db";

let db;

async function getDB() {
  if (db) return db;

  const SQL = await initSqlJs();

  // Load existing DB file or create a new one
  if (fs.existsSync(DB_FILE)) {
    const fileBuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create tasks table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      status TEXT DEFAULT 'todo'
    )
  `);

  return db;
}

// Save DB to file after every change
function saveDB() {
  const data = db.export();
  fs.writeFileSync(DB_FILE, Buffer.from(data));
}

module.exports = { getDB, saveDB };