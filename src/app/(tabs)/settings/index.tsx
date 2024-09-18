import { View } from "react-native";

import { colors } from "@/styles/color";
import { Button } from "@/components/button";
import { MaterialIcons } from "@expo/vector-icons";
import { exportData, importFromTxt } from "@/database/backup";

import { useSettings } from "./use-settings";

export default function Settings() {
  const { handleResetDatabase } = useSettings();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 40,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Button
          onPress={() =>
            exportData().then(() => alert("Backup feito com sucesso."))
          }
        >
          <MaterialIcons
            name="vertical-align-top"
            size={24}
            color={colors.text}
          />
        </Button>
        <Button
          onPress={() =>
            importFromTxt().then(() => alert("Restauro feito com sucesso"))
          }
        >
          <MaterialIcons
            name="vertical-align-bottom"
            size={24}
            color={colors.text}
          />
        </Button>
        <Button onPress={handleResetDatabase}>
          <MaterialIcons name="restart-alt" size={24} color={colors.text} />
        </Button>
      </View>
    </View>
  );
}
