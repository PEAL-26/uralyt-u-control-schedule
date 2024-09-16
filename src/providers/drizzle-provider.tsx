import { ReactNode } from "react";
import { SQLiteProvider } from "expo-sqlite";

import { ActivityIndicator, Text, View } from "react-native";

import { colors } from "@/styles/color";
import { useMigrations } from "@/hooks/use-migration";
import {
  useDatabaseConnection,
  DATABASE_NAME,
} from "@/hooks/use-database-connection";

export function DrizzleProvider({ children }: { children: ReactNode }) {
  const { database, connection, loading } = useDatabaseConnection();
  const { error, success } = useMigrations({ database, connection });

  // if (error && !loading && !success) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text style={{ color: colors.text }}>{error.message}</Text>
  //     </View>
  //   );
  // }

  // if (loading && !success) {
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //     <ActivityIndicator animating color={colors.primary} />
  //   </View>;
  // }

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>{children}</SQLiteProvider>
  );
}
