import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import BottomNavigation from "./src/navigation/BottomNavigation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function App() {
  return (
    <PaperProvider
      settings={{
        icon: (props) => <FontAwesomeIcon {...props} />,
      }}
    >
      <View style={styles.container}>
        <BottomNavigation />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
