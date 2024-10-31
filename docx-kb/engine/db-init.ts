import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initDatabase() {
  const db = await open({
    filename: './kb.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT,
      created DATETIME DEFAULT CURRENT_TIMESTAMP,
      modified DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS relationships (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      target_id TEXT NOT NULL,
      metadata TEXT,
      FOREIGN KEY (source_id) REFERENCES documents (id),
      FOREIGN KEY (target_id) REFERENCES documents (id)
    );

    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      structure TEXT NOT NULL,
      metadata TEXT
    );
  `);
}

initDatabase().catch(console.error);
