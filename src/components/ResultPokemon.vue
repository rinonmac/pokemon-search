<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">

    <div v-if="pokemon" class="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md relative">

      <div class="absolute top-4 left-4">
        <button
          @click="goBack"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          Back
        </button>
      </div>

      <div class="text-center mb-4">
        <img :src="pokemon.sprites.front_default" alt="Pokemon Image" class="w-32 mx-auto mb-4" />
        <h3 class="text-xl font-semibold">{{ capitalize(pokemon.name) }}</h3>

        <div class="mt-2">
          <a
            :href="bulbapediaUrl"
            target="_blank"
            class="text-blue-500 hover:text-blue-700">
            More Details About {{capitalize(pokemon.name)}}
          </a>
        </div>
      </div>

      <div class="flex space-x-6">

        <div class="w-1/3">
          <h4 class="text-lg mb-4">Types:</h4>
          <div class="space-y-2">
            <div
              v-for="(type) in pokemon.types"
              :key="type.type.name"
              class="px-4 py-2 rounded text-white"
              :style="{'background-color': getTypeColor(type.type.name)}">
              {{ capitalize(type.type.name) }}
            </div>
          </div>
        </div>

        <div class="w-2/3">
          <h4 class="text-lg mb-4">Stats:</h4>
          <table class="min-w-full table-auto border-collapse">
            <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2 text-left">Stat Name</th>
              <th class="px-4 py-2 text-left">Base Value</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(stat) in pokemon.stats" :key="stat.stat.name">
              <td class="px-4 py-2">{{ capitalize(stat.stat.name) }}</td>
              <td class="px-4 py-2">{{ stat.base_stat }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full mt-6">
        <h4 class="text-lg mb-4">Moves (Limit 10):</h4>
        <table class="min-w-full table-auto border-collapse">
          <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2 text-left">#</th>
            <th class="px-4 py-2 text-left">Move Name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(move, index) in pokemon.moves.slice(0, 10)" :key="move.move.name">
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ capitalize(move.move.name) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    }
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    }
  }>;
  moves: Array<{
    move: {
      name: string;
    }
  }>;
}

const router = useRouter();
const props = defineProps<{ name: string }>();

const pokemon = ref<Pokemon | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const bulbapediaUrl = computed(() => {
  if (!pokemon.value) return '';
  return `https://bulbapedia.bulbagarden.net/wiki/${capitalize(pokemon.value.name)}_(Pokémon)`;
});

function capitalize(value: string): string {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    fairy: '#EE99AC',
    bug: '#A8B820',
    normal: '#A8A878',
    ground: '#E0C068',
    fighting: '#C03028',
    poison: '#A040A0',
    dark: '#705848',
    ghost: '#705898',
    rock: '#B8A038',
    steel: '#B8B8D0',
  };

  return typeColors[type] || '#A8A878';
}

async function fetchPokemon() {
  try {
    isLoading.value = true;
    error.value = null;

    console.log(`Fetching Pokémon data for: https://pokeapi.co/api/v2/pokemon/${props.name}`);

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.name}`);

    console.log('API Response:', response);

    if (response.data) {
      pokemon.value = response.data;
    } else {
      error.value = 'Pokémon not found.';
    }
  } catch (err: any) {
    console.error('Error fetching Pokémon data:', err);
    error.value = `Error fetching data: ${err.response ? err.response.data : err.message}`;
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.go(-1);
}

// Watch for changes to name prop
watch(() => props.name, fetchPokemon);

// Fetch pokemon data when component is mounted
onMounted(fetchPokemon);
</script>
