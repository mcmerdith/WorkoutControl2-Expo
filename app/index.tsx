import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import DataComponent from "./data_component";
import trpc from "./trpc";

export default function HomeScreen() {
  const workout = trpc.workoutById.query(1);
  return (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <DataComponent
        source={workout}
        loading={<Text>Loading...</Text>}
        component={({ test }) => <Text>{test}</Text>}
      />
    </View>
  );
}
