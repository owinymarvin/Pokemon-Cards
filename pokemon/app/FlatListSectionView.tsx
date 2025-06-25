import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Platform, ScrollView } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
import pokemonData from "@/components/pokemon/data/pokemon_data.json";
import { FlatList } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const charmanderData = {
    name: "Charmander",
    image: require("@/assets/images/charmander.png"),
    type: "Fire",
    hp: 39,
    moves: ["Scratch", "Ember", "Growl", "Leer"],
    weaknesses: ["Water", "Rock"],
  };

  const squirtleData = {
    name: "Squirtle",
    image: require("@/assets/images/squirtle.png"), // Replace with the actual image path
    type: "Water",
    hp: 44,
    moves: ["Tackle", "Water Gun", "Tail Whip", "Withdraw"],
    weaknesses: ["Electric", "Grass"],
  };

  const bulbasaurData = {
    name: "Bulbasaur",
    image: require("@/assets/images/bulbasaur.png"), // Replace with the actual image path
    type: "Grass",
    hp: 45,
    moves: ["Tackle", "Vine Whip", "Growl", "Leech Seed"],
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  };

  const pikachuData = {
    name: "Pikachu",
    image: require("@/assets/images/pikachu.png"), // Replace with the actual image path
    type: "Electric",
    hp: 35,
    moves: ["Quick Attack", "Thunderbolt", "Tail Whip", "Growl"],
    weaknesses: ["Ground"],
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
        <ThemedView style={styles.container}>
          <FlatList
            data={pokemonData}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <ThemedView>
                <ThemedText>No items found</ThemedText>
              </ThemedView>
            }
            renderItem={({ item }) => {
              console.log(item.id);
              return (
                <ThemedView style={styles.card} key={item.id}>
                  <ThemedText>{item.type}</ThemedText>
                  <ThemedText>{item.name}</ThemedText>
                </ThemedView>
              );
            }}
            ListHeaderComponent={
              <ThemedView>
                <ThemedText>Pokemon List</ThemedText>
              </ThemedView>
            }
            ListFooterComponent={
              <ThemedView>
                <ThemedText>End of List</ThemedText>
              </ThemedView>
            }
          />
        </ThemedView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "red" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: RNStatusBar.currentHeight || 0,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
});
