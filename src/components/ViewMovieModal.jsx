import React, { useContext } from "react";
import { useState } from "react";
import { ImageBackground } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Provider,
  Button,
  IconButton,
  ActivityIndicator,
  Chip,
} from "react-native-paper";
import {
  AlertDialogContext,
  ViewModalMovieContext,
} from "../contexts/Contexts";
import { baseImageUrl, colors, window } from "../helpers/constants";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  convertMinsToHrsMins,
  convertNumToWord,
  getMovieOrShowDetails,
} from "../helpers/helper";
import { useEffect } from "react";

export default function ViewMovieModal() {
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [playVideo, setplayVideo] = useState(true);

  const { viewMovieModal, setViewMovieModal } = useContext(
    ViewModalMovieContext
  );
  const { setAlertDialog } = useContext(AlertDialogContext);

  const hideModal = () => {
    setViewMovieModal({ open: false, id: null, type: "movie" });
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (typeof viewMovieModal.id === "number") {
      getMovieOrShowDetails(viewMovieModal.id, viewMovieModal.type)
        .then((result) => {
          setDetails(result);
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setAlertDialog({
            open: true,
            title: "Oops!",
            text: err.message,
            onPress: hideModal,
          });
        });
    } else {
      hideModal();
    }
  }, [viewMovieModal.id]);
  console.log({ details });
  return (
    <Portal>
      <Modal
        visible={Boolean(viewMovieModal.open)}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
        style={styles.fullScreenModel}
      >
        <View style={styles.topBar}>
          <IconButton
            // icon={require("../../assets/Icons/left-chevron.png")}
            icon="close"
            size={25}
            style={styles.backBtn}
            color={colors.light}
            onPress={hideModal}
          />
        </View>
        {!loading ? (
          <ScrollView style={styles.scollerWrapper}>
            <View style={styles.centerContent}>
              <ImageBackground
                source={{
                  uri: baseImageUrl + details.poster_path,
                }}
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
            </View>
            <View style={styles.movieDetails}>
              <Text
                style={[
                  styles.text,
                  styles.nameText,
                  { fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "" },
                ]}
              >
                {viewMovieModal.type === "movie"
                  ? details.original_title
                  : details.original_title}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "",
                  },
                ]}
              >
                {viewMovieModal.type === "movie"
                  ? convertMinsToHrsMins(details.runtime) + "Hours"
                  : details.networks
                  ? details.networks[0].name
                  : details.tagline}{" "}
                |{" "}
                {viewMovieModal.type === "movie"
                  ? details.release_date
                  : details.last_air_date}{" "}
                | {details.vote_average / 2} ⭐️ {"\n"}
                Status : {details.status}
              </Text>
              <View style={styles.chipsWrapper}>
                {details.genres.map((genre, key) => (
                  <View style={styles.chip} key={key}>
                    <Text style={styles.chipText}>{genre.name}</Text>
                  </View>
                ))}
              </View>
              <Text
                style={[
                  styles.text,
                  styles.descriptionText,
                  {
                    fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "",
                  },
                ]}
              >
                {details.overview}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: fontsLoaded ? "Poppins_600SemiBold" : "",
                    textTransform: "capitalize",
                  },
                ]}
              >
                {viewMovieModal.type === "movie" && details.budget
                  ? "Budget : " + convertNumToWord(details.budget) + "dollars"
                  : "Type : " + details.type}
              </Text>
              <YoutubePlayer
                play={playVideo}
                // videoId={details.videos[0].key}
                playList={details.videos.map((video) => video.key)}
                height={200}
                webViewStyle={{
                  borderColor: "red",
                  borderStyle: "solid",
                  borderWidth: 12,
                  flex: 1,
                  marginTop: 12,
                }}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator animating={loading} color={colors.secondary} />
          </View>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  topBar: { width: "100%" },
  backBtn: {
    color: colors.light,
  },
  scollerWrapper: {
    width: "100%",
    height: "100%",
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  imageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: colors.secondary,
    height: window.height * 0.6,
    width: window.width - 100,
  },
  image: {
    width: window.width - 100,
    borderRadius: 30,
    alignSelf: "center",
  },
  movieDetails: {
    width: "100%",
    height: "100%",
    padding: 12,
    marginTop: 12,
    paddingLeft: 18,
    paddingRight: 18,
  },
  text: {
    color: colors.light,
    fontSize: 12,
  },
  nameText: {
    fontSize: 24,
  },
  descriptionText: {
    fontSize: 15,
    marginBottom: 12,
  },
  chipsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    marginTop: 6,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8,
    marginRight: 8,
  },
  chipText: {
    color: colors.light,
    fontSize: 8,
  },
  loadingWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
});
