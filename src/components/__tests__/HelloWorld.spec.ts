import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormPokemon from '../FormPokemon.vue'

describe('FormPokemon', () => {
  it('renders properly', () => {
    const wrapper = mount(FormPokemon)
    expect(wrapper.find('h2').text()).toContain('Pokémon Search')
  })
})
