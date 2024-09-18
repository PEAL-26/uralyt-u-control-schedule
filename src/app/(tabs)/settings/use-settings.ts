import { Alert } from "react-native";
import { resetDatabase } from "@/database/migrate";
export function useSettings() {
  const handleResetDatabase = () => {
    Alert.alert(
      "Reiniciar a base de dados?",
      "Todos os dados serão apagados, continuar mesmo assim?",
      [
        { text: "Cancelar" },
        {
          text: "Ok",
          onPress: async () => {
            try {
              await resetDatabase();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: "dark",
      }
    );
  };

  return {
    handleResetDatabase,
  };
}
