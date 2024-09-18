import "react-native-gesture-handler";

import {
  enableExperimentalWebImplementation,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/styles/color";
import { DrizzleProvider } from "@/providers/drizzle-provider";

export default function Layout() {
  enableExperimentalWebImplementation(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <DrizzleProvider>
          <Slot initialRouteName="(tabs)/home/index" screenOptions={{ headerShown: false }} />
          <StatusBar style="light" translucent animated />
        </DrizzleProvider>
      </View>
    </GestureHandlerRootView>
  );
}
