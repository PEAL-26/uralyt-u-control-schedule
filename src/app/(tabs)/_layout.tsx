import { colors } from "@/styles/color";
import { Slot } from "expo-router";
import { Tabs } from "expo-router/tabs";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        // tabBarInactiveTintColor: colors.gray[3],
        tabBarHideOnKeyboard: true,
      }}
      // tabBar={({ ...rest }) => (
      //   <TabBarComponent
      //     segment="(seller)"
      //     initialRouteName="index"
      //     tabs={SELLER_TABS}
      //     {...rest}
      //   />
      // )}
    >
      <Tabs.Screen
        key="home"
        name="home"
        options={{
          title: "Home",
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        key="charts"
        name="charts"
        options={{
          title: "Gráficos",
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        key="settings"
        name="settings"
        options={{
          title: "Configurações",
          tabBarHideOnKeyboard: true,
        }}
      />
    </Tabs>
  );
}
