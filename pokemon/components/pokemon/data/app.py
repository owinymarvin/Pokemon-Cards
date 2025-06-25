import json
import random

# --- Configuration ---
NUM_ENTRIES = 550 # You requested over 500, so setting to 550
OUTPUT_FILENAME = "pokemon_data.json"
IMAGE_BASE_PATH = "@/assets/images/pokemon/" # Base path for your images

# Define possible Pokémon types
POKEMON_TYPES = [
    "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison",
    "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Steel",
    "Dark", "Fairy"
]

# Define some common moves for variety
COMMON_MOVES = [
    "Tackle", "Growl", "Scratch", "Ember", "Water Gun", "Vine Whip", "Quick Attack",
    "Thunderbolt", "Tail Whip", "Withdraw", "Leech Seed", "Flamethrower", "Hydro Pump",
    "Razor Leaf", "Thunder Shock", "Bite", "Double Kick", "Poison Jab", "Earthquake",
    "Gust", "Psycho Cut", "Bug Buzz", "Stone Edge", "Shadow Ball", "Dragon Claw",
    "Iron Tail", "Dark Pulse", "Dazzling Gleam", "Hyper Beam", "Protect", "Rest"
]

# Define weaknesses for each type (simplified for generation)
# In a real game, this would be much more detailed
TYPE_WEAKNESSES = {
    "Normal": ["Fighting"],
    "Fire": ["Water", "Ground", "Rock"],
    "Water": ["Electric", "Grass"],
    "Grass": ["Fire", "Ice", "Poison", "Flying", "Bug"],
    "Electric": ["Ground"],
    "Ice": ["Fire", "Fighting", "Rock", "Steel"],
    "Fighting": ["Flying", "Psychic", "Fairy"],
    "Poison": ["Ground", "Psychic"],
    "Ground": ["Water", "Grass", "Ice"],
    "Flying": ["Electric", "Ice", "Rock"],
    "Psychic": ["Bug", "Ghost", "Dark"],
    "Bug": ["Fire", "Flying", "Rock"],
    "Rock": ["Water", "Grass", "Fighting", "Ground", "Steel"],
    "Ghost": ["Ghost", "Dark"],
    "Dragon": ["Ice", "Dragon", "Fairy"],
    "Steel": ["Fire", "Fighting", "Ground"],
    "Dark": ["Fighting", "Bug", "Fairy"],
    "Fairy": ["Poison", "Steel"]
}

# Simple list of common Pokémon-like name parts to create new names
NAME_PARTS_START = ["Bulba", "Char", "Squir", "Pika", "Venu", "Ivy", "Wart", "Blasto", "Cater", "Meta", "Butter", "Pidge", "Rati", "Spear", "Ekans", "Arbo", "Raichu", "Sand", "Nido", "Clef", "Vulp", "Jigg", "Zubat", "Odd", "Para", "Dig", "Mew", "Eevee", "Snor"]
NAME_PARTS_END = ["saur", "mander", "tle", "chu", "saur", "saur", "tle", "toise", "pie", "pod", "free", "y", "t", "row", "k", "ok", "chu", "shrew", "ran", "fable", "ix", "lypuff", "bat", "ish", "sect", "lett", "two", "vee", "lax", "don"]

def generate_pokemon_name():
    start = random.choice(NAME_PARTS_START)
    end = random.choice(NAME_PARTS_END)
    # Ensure some variety, e.g., don't always combine based on index
    if random.random() < 0.3: # Sometimes just use a single part
        return random.choice(NAME_PARTS_START)
    elif random.random() < 0.6: # Sometimes just combine
        return start + end
    else: # Combine and maybe add a number or simple suffix
        return start + end + (str(random.randint(1, 9)) if random.random() < 0.2 else random.choice(["mon", "star", "kin", "o"]))

def generate_pokemon_data(pokemon_id):
    pokemon_type = random.choice(POKEMON_TYPES)
    name = generate_pokemon_name()
    # Ensure first 9 entries match your exact examples if you wish
    if pokemon_id == 1:
        name = "Bulbasaur"
        pokemon_type = "Grass"
    elif pokemon_id == 2:
        name = "Ivysaur"
        pokemon_type = "Grass"
    elif pokemon_id == 3:
        name = "Venusaur"
        pokemon_type = "Grass"
    elif pokemon_id == 4:
        name = "Charmander"
        pokemon_type = "Fire"
    elif pokemon_id == 5:
        name = "Charmeleon"
        pokemon_type = "Fire"
    elif pokemon_id == 6:
        name = "Charizard"
        pokemon_type = "Fire"
    elif pokemon_id == 7:
        name = "Squirtle"
        pokemon_type = "Water"
    elif pokemon_id == 8:
        name = "Wartortle"
        pokemon_type = "Water"
    elif pokemon_id == 9:
        name = "Blastoise"
        pokemon_type = "Water"

    hp = random.randint(30, 120) # Random HP
    num_moves = random.randint(2, 4)
    moves = random.sample(COMMON_MOVES, num_moves)

    # Get weaknesses based on the chosen type
    weaknesses = TYPE_WEAKNESSES.get(pokemon_type, ["Unknown"])
    num_weaknesses = random.randint(1, len(weaknesses))
    selected_weaknesses = random.sample(weaknesses, num_weaknesses)


    return {
        "id": str(pokemon_id), # ID as string
        "name": name,
        "image": f"{IMAGE_BASE_PATH}pokemon_{pokemon_id}.png", # Placeholder image path
        "type": pokemon_type,
        "hp": hp,
        "moves": moves,
        "weaknesses": selected_weaknesses,
    }

def main():
    pokemon_list = []
    for i in range(1, NUM_ENTRIES + 1):
        pokemon_list.append(generate_pokemon_data(i))

    with open(OUTPUT_FILENAME, "w") as f:
        json.dump(pokemon_list, f, indent=2)

    print(f"Generated {NUM_ENTRIES} Pokémon entries and saved to {OUTPUT_FILENAME}")
    print(f"Remember to create image files like '{IMAGE_BASE_PATH}pokemon_1.png', etc., in your project.")

if __name__ == "__main__":
    main()