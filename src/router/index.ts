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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
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
