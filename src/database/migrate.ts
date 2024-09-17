import { SQLiteDatabase } from "expo-sqlite";
import { connection, db } from "./connection";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE  IF NOT EXISTS schedules (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            date text NOT NULL,
            spoons real NOT NULL,
            pH real NOT NULL
    );
  `);
}

export async function resetDatabase() {
  await connection.execAsync(`DROP TABLE IF EXISTS schedules;`);
  await migrateDbIfNeeded(connection);
}
