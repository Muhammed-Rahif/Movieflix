import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { colors, window } from "../helpers/constants";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { getEmoji } from "../helpers/emojies";
import { useEffect } from "react";

export default function SelectableChips({ chipsArray = [] }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [chips, setChips] = useState(chipsArray);
  const [selectedChips, setSelectedChips] = useState([]);

  useEffect(() => {
    setChips(chipsArray);
  }, [chipsArray, setChips]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      horizontal
    >
      {chips.map((chip, key) => (
        <Chip
          style={[
            styles.chip,
            selectedChips.includes(chip) ? styles.selectedChip : null,
          ]}
          textStyle={[
            styles.chipText,
            { fontFamily: fontsLoaded ? "Poppins_400Regular" : "" },
          ]}
          key={key}
          onPress={() => {
            if (selectedChips.includes(chip)) {
              setSelectedChips(
                selectedChips.filter(
                  (itm, indx) => indx !== selectedChips.indexOf(chip)
                )
              );
            } else {
              setSelectedChips([...selectedChips, chip]);
            }
          }}
        >
          {getEmoji(chip) + "  " + chip}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: window.width,
    flexDirection: "row",
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 12,
  },
  scrollView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 12,
  },
  chip: {
    borderColor: colors.secondary,
    backgroundColor: colors.transparent,
    color: colors.light,
    marginRight: 8,
  },
  chipText: { color: colors.light, fontSize: 12 },
  selectedChip: {
    backgroundColor: colors.secondary,
  },
});
