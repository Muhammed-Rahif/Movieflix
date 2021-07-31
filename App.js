import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import BottomNavigation from "./src/navigation/BottomNavigation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Contexts from "./src/contexts/Contexts";
import AlertDialog from "./src/components/AlertDialog";
import ViewMovieModal from "./src/components/ViewMovieModal";

export default function App() {
  return (
    <Contexts>
      <PaperProvider
        settings={{
          icon: (props) => <FontAwesomeIcon {...props} />,
        }}
      >
        <View style={styles.container}>
          <ViewMovieModal />
          <AlertDialog />
          <BottomNavigation />
        </View>
      </PaperProvider>
    </Contexts>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
