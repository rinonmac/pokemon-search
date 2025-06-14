import { createRouter, createWebHistory } from 'vue-router'
import pokemonDetail from "@/components/ResultPokemon.vue"
import FormPokemon from "@/components/FormPokemon.vue"

const BASE_URL = (import.meta as any).env.BASE_URL || ''

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PokemonAPI',
      component: FormPokemon,
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon-detail',
      component: pokemonDetail,
      props: true,
    }
  ],
})

export default router
