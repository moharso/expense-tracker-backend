import Database from 'better-sqlite3';

const dbPath = './data/expenses.db';

const db = new Database(dbPath, { verbose: console.log });

export const setupDatabase = () => {
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
    console.log('Database is set up and schema created.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to set up the database:', error.message);
    } else {
      console.error('Failed to set up the database: Unknown error');
    }
    throw error;
  }
};

export function getDb() {
  return db;
}
