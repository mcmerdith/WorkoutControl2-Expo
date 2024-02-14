import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <Text>Testing reload</Text>
    </View>
  );
}