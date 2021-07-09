import { Dimensions } from "react-native";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const baseImageUrl = "https://image.tmdb.org/t/p/original";

const colors = {
  primary: "#070d2d",
  secondary: "#556ee5" || "#1a37bd",
  light: "whitesmoke",
  primaryDark: "#05091e",
  secondaryDark: "",
  transparent: "rgba(7, 13, 45, .8)",
  warning: "#ffc107",
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export { colors, window, screen, axios, baseImageUrl };
