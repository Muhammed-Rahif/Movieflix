import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import BottomNavigation from "./src/navigation/BottomNavigation";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function App() {
  return (
    <PaperProvider
      settings={{
        icon: (props) => <AwesomeIcon {...props} />,
      }}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <BottomNavigation />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
