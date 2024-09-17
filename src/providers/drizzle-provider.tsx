import { ReactNode, Suspense } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, Text, View } from "react-native";

import { colors } from "@/styles/color";
import { useMigrations } from "@/hooks/use-migration";
import { DATABASE_NAME } from "@/database/connection";
import { migrateDbIfNeeded } from "@/database/migrate";

export function DrizzleProvider({ children }: { children: ReactNode }) {
  // const { error, success } = useMigrations();

  // if (error) {
  //   console.error(error);
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text style={{ color: colors.text }}>
  //         Oops! Falha ao carregar aplicação.
  //       </Text>
  //     </View>
  //   );
  // }

  // if (!success) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator animating color={colors.primary} size={32} />
  //     </View>
  //   );
  // }

  return (
    <Suspense
      fallback={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating color={colors.primary} size={32} />
        </View>
      }
    >
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        onInit={migrateDbIfNeeded}
        useSuspense
      >
        {children}
      </SQLiteProvider>
    </Suspense>
  );
}
