import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, window } from "../helpers/constants";

export default function ImageCard({ imageSrc }) {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={{ uri: imageSrc }}
        style={styles.ImageWrapper}
        imageStyle={styles.image}
      ></ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 3 },
  ImageWrapper: {
    borderRadius: 12,
    backgroundColor: colors.secondary,
    height: window.height * 0.35,
    width: window.width * 0.5 - 18,
  },
  image: {
    width: window.width * 0.5 - 18,
    borderRadius: 12,
  },
});
