import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, window } from "../helpers/constants";
import { Searchbar } from "react-native-paper";
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
        placeholder="Search here..."
        inputStyle={[
          styles.searchBarInput,
          { fontFamily: fontsLoaded ? "Poppins_400Regular" : "" },
        ]}
        clearIcon
        onChangeText={(query) => {
          setSearchFor(query);
        }}
        value={searchFor}
        placeholderTextColor={colors.light}
        iconColor={colors.light}
        clearIcon="close"
        autoFocus={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarWrapper: {
    padding: 28,
    paddingBottom: 12,
    paddingTop: 12,
    marginTop: window.height * 0.038,
    marginBottom: 8,
    borderRadius: 24,
    color: colors.light,
    zIndex: 9,
  },
  searchBar: {
    backgroundColor: colors.secondary,
    borderRadius: 28,
    color: colors.light,
  },
  searchBarInput: {
    backgroundColor: colors.secondary,
    color: colors.light,
    fontSize: 14,
  },
});
