import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Platform, StyleSheet, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

const getTypeDetails = (type: string) => {
  switch (type.toLowerCase()) {
    case "electric":
      return { borderColor: "#FFD700", emoji: "🔌" };
    case "water":
      return { borderColor: "#6493EA", emoji: "💧" };
    case "fire":
      return { borderColor: "#FF5733", emoji: "🔥" };
    case "grass":
      return { borderColor: "#66CC66", emoji: "🍀" };
    default:
      return { borderColor: "A0A0A0", emoji: "❓" };
  }
};

export type Props = {
  name: string;
  image: ImageSourcePropType;
  type: string;
  hp: number;
  moves: string[];
  weaknesses: string[];
};

export function PokemonCard({
  name,
  image,
  type,
  hp,
  moves,
  weaknesses,
}: Props) {
  const { borderColor, emoji } = getTypeDetails(type);
  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.nameContainer}>
        <ThemedText style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.hp}>{hp}</ThemedText>
      </ThemedView>

      <Image
        source={image}
        style={styles.image}
        accessibilityLabel={`${name} poke Card`}
      />

      <ThemedView style={styles.typeContainer}>
        <ThemedView style={[styles.typeBadge, { borderColor }]}>
          <ThemedText style={styles.typeEmoji}>{emoji}</ThemedText>
          <ThemedText style={styles.typeText}>{type}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.movesContainer}>
        <ThemedText style={styles.movesText}>
          Moves: {moves.join(", ")}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.weaknessContainer}>
        <ThemedText style={styles.weaknessText}>
          Weaknesses: {weaknesses.join(", ")}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    padding: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        elevation: 5,
      },
    }),
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 16,
    resizeMode: "contain",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  hp: {
    fontSize: 22,
  },
  typeContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 4,
    borderRadius: 20,
  },
  typeEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  typeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  movesContainer: {
    marginBottom: 16,
  },
  movesText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  weaknessContainer: { marginBottom: 8 },
  weaknessText: { fontSize: 22, fontWeight: "bold" },
});
