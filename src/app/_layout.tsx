import "react-native-gesture-handler";

import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Slot, Stack } from "expo-router";

import { Home } from "@/app/(tabs)/home";
import { colors } from "@/styles/color";
import { DrizzleProvider } from "@/providers/drizzle-provider";
import {
  enableExperimentalWebImplementation,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function Layout() {
  enableExperimentalWebImplementation(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <DrizzleProvider>
          <Home />
          {/* <Slot screenOptions={{ headerShown: false }} /> */}
          <StatusBar style="light" translucent animated />
        </DrizzleProvider>
      </View>
    </GestureHandlerRootView>
  );
}
