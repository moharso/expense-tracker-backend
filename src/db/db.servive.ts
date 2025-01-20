import Database from 'better-sqlite3';

const dbPath = './data/expenses.db';

const db = new Database(dbPath, { verbose: console.log });

const initializeDatabase = () => {
  try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          amount REAL NOT NULL,
          currency TEXT NOT NULL,
          category TEXT NOT NULL,
          date DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    console.log('Database initialized and schema created.');
  } catch (error) {
    console.error('Failed to initialize the database:', Error);
    throw error;
  }
};

initializeDatabase();

export default db;
