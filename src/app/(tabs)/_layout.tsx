import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router/tabs";
import { colors } from "@/styles/color";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        // headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.inputBorder,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabel: ({ children, color }) => (
          <Text style={{ color, fontSize: 10, paddingBottom: 8 }}>
            {children}
          </Text>
        ),
        headerStyle: {
          backgroundColor: colors.cardBackground,
        },
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="charts/index"
        options={{
          title: "Gráficos",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bar-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
