<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="mb-4 text-2xl font-semibold text-center text-gray-700">Pokémon Search</h2>
      <form @submit.prevent="validateAndFetch">
        <div class="flex flex-col mb-4">
          <input
            type="text"
            v-model="pokemonName"
            @input="clearError"
            class="px-4 py-2 mb-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Pokémon Name (e.g., pikachu)"
          />
          <span v-if="formError" class="text-sm text-red-500">{{ formError }}</span>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
      <div v-if="isLoading" class="text-center">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonName: "",
      formError: null,
      isLoading: false,
    };
  },
  methods: {
    validateAndFetch() {
      if (!this.pokemonName.trim()) {
        this.formError = "This field is required.";
        return;
      }
      this.formError = null;

      const formattedName = this.pokemonName.toLowerCase().trim();
      this.$router.push({name: 'pokemon-detail', params: {name: formattedName}});
    },
    clearError() {
      this.formError = null;
    },
  },
};
</script>
