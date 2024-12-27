import { createRouter, createWebHistory } from 'vue-router'
import pokemonDetail from "@/components/ResultPokemon.vue"
import FormPokemon from "@/components/FormPokemon.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
