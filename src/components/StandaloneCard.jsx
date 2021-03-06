import React, { useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { ActivityIndicator, Card, Chip } from "react-native-paper";
import { colors, window } from "../helpers/constants";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { AirbnbRating } from "react-native-ratings";
import { ViewModalMovieContext } from "../contexts/Contexts";

export default function StandaloneCard({
  id,
  bannerImageSrc = "",
  title = "",
  subtitle = "",
  voteCount = 0,
  releaseDate = "",
  tags = [],
  rating = 0,
  percentageLiked = 0,
  mediaType = "Movie",
}) {
  const [imageLoading, setImageLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const { setViewMovieModal } = useContext(ViewModalMovieContext);

  return (
    <TouchableNativeFeedback
      onPress={() => {
        setViewMovieModal({
          open: true,
          id,
          type: mediaType === "Movie" ? "movie" : "tv",
        });
      }}
    >
      <Card style={styles.card}>
        <Text
          style={[
            styles.simpleText,
            { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
          ]}
        >
          Release date : {releaseDate}
        </Text>
        <Text
          style={[
            styles.title,
            { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
          ]}
        >
          {title}
        </Text>
        {/* <Card.Cover
          style={styles.cardImage}
          source={{
            uri: bannerImageSrc,
          }}
        /> */}
        <ImageBackground
          source={{ uri: bannerImageSrc }}
          imageStyle={styles.cardImage}
          style={styles.cardImage}
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
          <View style={styles.loadingWrapper}>
            {imageLoading ? (
              <ActivityIndicator
                animating={imageLoading}
                style={styles.loading}
                color={colors.secondary}
              />
            ) : null}
          </View>
        </ImageBackground>
        <View style={styles.tagsWrapper}>
          {tags.map((tag, key) => (
            <Chip mode="outlined" key={key} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
            </Chip>
          ))}
        </View>
        <AirbnbRating
          count={5}
          defaultRating={rating / 2}
          size={20}
          showRating={false}
          ratingContainerStyle={styles.starRating}
          isDisabled
        />
        <Text
          style={[
            styles.simpleText,
            { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
          ]}
        >
          Media type : {mediaType}
          {"\n"}
          {percentageLiked}% liked this {mediaType}, {voteCount} Votes
        </Text>
        <Text
          style={[
            styles.subtitle,
            { fontFamily: fontsLoaded ? "Poppins_400Regular" : "" },
          ]}
        >
          {subtitle}
        </Text>
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    padding: 12,
    paddingTop: 0,
    borderRadius: 22,
    backgroundColor: colors.secondary,
  },
  cardImage: {
    borderRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 22,
    width: "100%",
    backgroundColor: colors.primary,
    height: 180,
  },
  title: {
    fontSize: 24,
    color: colors.light,
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.light,
    marginTop: 4,
    marginLeft: 6,
  },
  simpleText: {
    fontSize: 12,
    color: colors.warning,
    marginTop: 12,
    marginTop: 12,
    marginLeft: 6,
  },
  tagsWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 12,
    maxWidth: window.width - 24,
    flexWrap: "wrap",
  },
  chipText: {
    fontSize: 10,
    color: colors.light,
  },
  chip: {
    margin: 1,
    backgroundColor: colors.transparent,
  },
  starRating: {
    marginTop: 4,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  loadingWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    marginTop: 80,
  },
});
