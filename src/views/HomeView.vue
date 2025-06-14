<script setup lang="ts">
import { useRouter } from 'vue-router'
import FormPokemon from '../components/FormPokemon.vue'

// Provide router instance to be used by FormPokemon component
const router = useRouter()
</script>

<template>
  <main>
    <FormPokemon />
  </main>
</template>
