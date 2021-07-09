import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../helpers/constants";
import { Searchbar, Text } from "react-native-paper";
import { SearchContext } from "../contexts/Contexts";
import { useContext } from "react";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function SearchBar() {
  const { searchFor, setSearchFor } = useContext(SearchContext);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  return (
    <View style={styles.searchBarWrapper}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search your movie, tv show..."
        inputStyle={[
          styles.searchBarInput,
          {
            fontFamily: fontsLoaded && "Poppins_400Regular",
          },
        ]}
        clearIcon
        onChangeText={(query) => {
          setSearchFor(query);
        }}
        value={searchFor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarWrapper: {
    padding: 28,
    top: 28,
  },
  searchBar: {
    backgroundColor: colors.secondary,
    borderRadius: 28,
    borderColor: "lightgrey",
    borderStyle: "solid",
  },
  searchBarInput: {
    color: colors.primary,
    fontSize: 14,
  },
});
