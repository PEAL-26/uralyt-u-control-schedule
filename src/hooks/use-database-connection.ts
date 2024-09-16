// import * as mysql from "drizzle-orm/mysql2";
import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";
import * as expo from "drizzle-orm/expo-sqlite";
// import mysqlPromise from "mysql2/promise";

// import { mysqlConnection } from "@/libs/mysql";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

export const DATABASE_NAME = "database.db";

export type DatabaseType =
  | any // mysql.MySql2Database<Record<string, never>>
  | expo.ExpoSQLiteDatabase<Record<string, never>>
  | null;

export type ConnectionType =
  /* mysqlPromise.Connection | */ SQLiteDatabase | null;

export function useDatabaseConnection() {
  const [database, setDatabase] = useState<DatabaseType>(null);
  const [connection, setConnection] = useState<ConnectionType>(null);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    if (Platform.OS === "web") {
      // const connection = await mysqlConnection();
      // const result = mysql.drizzle(connection);
      // setDatabase(result);
      // setConnection(connection);
    }

    if (Platform.OS !== "web") {
      const connection = openDatabaseSync(DATABASE_NAME, {
        enableChangeListener: true,
      });
      const result = expo.drizzle(connection);
      setDatabase(result);
      setConnection(connection);
    }
  };

  useEffect(() => {
    setLoading(true);
    init().finally(() => setLoading(false));
  }, []);

  return { loading, database, connection };
}
