import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { colors } from "../helpers/constants";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Movies from "../screens/Movies";
import Shows from "../screens/Shows";
import { NavigationIndexContext, SearchContext } from "../contexts/Contexts";

const HomeScreen = () => <Home />;

const SearchScreen = () => <Search />;

const MoviesScreen = () => <Movies />;

const ShowsScreen = () => <Shows />;

export default function Navigation() {
  const { navigationIndex, setNavigationIndex } = useContext(
    NavigationIndexContext
  );
  const { searchFor } = useContext(SearchContext);
  const routes = [
    { key: "home", title: "•", icon: "home", color: colors.primary },
    { key: "search", title: "•", icon: "search", color: colors.primary },
    { key: "movies", title: "•", icon: "film", color: colors.primary },
    { key: "shows", title: "•", icon: "tv", color: colors.primary },
  ];

  useEffect(() => {
    if (searchFor && navigationIndex !== 1) {
      setNavigationIndex(1);
    }
  }, [searchFor]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    movies: MoviesScreen,
    shows: ShowsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index: navigationIndex, routes }}
      onIndexChange={setNavigationIndex}
      renderScene={renderScene}
      style={styles.bottomNavigation}
      activeColor={colors.secondary}
      keyboardHidesNavigationBar={false}
    />
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {},
});
