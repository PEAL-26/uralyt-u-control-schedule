// import * as path from "node:path";
import { Platform } from "react-native";
import { useEffect, useState } from "react";
// import { migrate } from "drizzle-orm/mysql2/migrator";
import { useMigrations as useMigrationsSqlite } from "drizzle-orm/expo-sqlite/migrator";

import migrations from "../../drizzle/migrations";

interface Props {
  database: any;
  connection: any;
}

export function useMigrations(props: Props) {
  const { database, connection } = props;
  const [successGlobal, setSuccessGlobal] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState<Error | null>(null);

  const { success, error } =
    Platform.OS !== "web"
      ? useMigrationsSqlite(database, migrations)
      : { success: false, error: null };

  const mysqlMigrate = async () => {
    if (!database) return;

    try {
      setSuccessGlobal(false);
      // await migrate(database, {
      //   migrationsFolder: path.join(__dirname, "..", "..", "drizzle"),
      // });
      setSuccessGlobal(true);
    } catch (error: any) {
      setErrorGlobal(new Error(error));
    } finally {
      await connection.end();
    }
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      mysqlMigrate();
    }
  }, []);

  return { success: success || successGlobal, error: error || errorGlobal };
}
