export const getStringWithFirstUpperLetter = (val = '') => val.charAt(0).toUpperCase() + val.slice(1)

export const urls = {
  home: '/pokemons-list',
  pokedex: '/pokedex',
  legendaries: '/legendaries',
  documentation: '/documentation'
}
