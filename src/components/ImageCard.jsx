import React, { useContext, useState } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ViewModalMovieContext } from "../contexts/Contexts";
import { colors, window } from "../helpers/constants";

export default function ImageCard({ imageSrc = "", id, type = "movie" }) {
  const [imageLoading, setImageLoading] = useState(true);

  const { setViewMovieModal } = useContext(ViewModalMovieContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setViewMovieModal({ open: true, id, type });
      }}
    >
      <ImageBackground
        source={{ uri: imageSrc }}
        style={styles.imageWrapper}
        imageStyle={styles.image}
        onLoadStart={() => {
          setImageLoading(true);
        }}
        onLoadEnd={() => {
          setImageLoading(false);
        }}
        onLoad={() => {
          setImageLoading(false);
        }}
      >
        {imageLoading ? (
          <ActivityIndicator
            animating={imageLoading}
            style={styles.loading}
            color={colors.primary}
          />
        ) : null}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 3 },
  imageWrapper: {
    borderRadius: 12,
    backgroundColor: colors.secondary,
    height: window.height * 0.35,
    width: window.width * 0.5 - 18,
  },
  image: {
    width: window.width * 0.5 - 18,
    borderRadius: 12,
  },
  loading: {
    marginTop: (window.height * 0.35) / 2,
    marginBottom: (window.height * 0.35) / 2,
  },
});
