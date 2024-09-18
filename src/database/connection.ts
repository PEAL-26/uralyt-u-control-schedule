import { openDatabaseSync } from "expo-sqlite/next";
import * as expo from "drizzle-orm/expo-sqlite";
import * as schema from "./schemas";

export const DATABASE_NAME = "database.db";
export const connection = openDatabaseSync(DATABASE_NAME);
export const db = expo.drizzle(connection, { schema, logger: true });
