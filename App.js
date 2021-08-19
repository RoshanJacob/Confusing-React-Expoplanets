import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
import DetailsScreen from "./Screens/DetailsScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default function App() {
  return <AppContainer />;
}
const AppStackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    DetailsScreen: {
      screen: DetailsScreen,
    },
  },

  {
    initialRouteName: "HomeScreen",
  }
);

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
