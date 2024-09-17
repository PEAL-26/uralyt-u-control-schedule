import { Platform } from "react-native";
import { useEffect, useState } from "react";
import { useMigrations as useMigrationsSqlite } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/database/connection";

import migrations from "../../drizzle/migrations";

export function useMigrations() {
  const [successGlobal, setSuccessGlobal] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState<Error | undefined>(undefined);

  if (db && Platform.OS !== "web") {
    
    // const { success, error } = useMigrationsSqlite(db, migrations);
    // return { success, error };
  }

  useEffect(() => {
    setSuccessGlobal(true);
  }, []);

  return { success: successGlobal, error: errorGlobal };
}
