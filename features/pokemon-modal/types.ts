export type ResponsePokemonDataType = {
    id: string,
    name: string,
    types: {type: {name: string}}[],
    stats: {base_stat:string}[]
    abilities: {ability : {name: string}}[]
    base_experience: string
    sprites: any
};
