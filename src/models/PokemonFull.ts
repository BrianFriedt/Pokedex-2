import { Pokemon } from './Pokemon';
import { Stats } from './Stats';

export class PokemonFull extends Pokemon {
  height: number;
  weight: number;
  abilities: string[];
  egg_groups: string[];
  stats: Stats;
  genus: string;
  description: string;

  constructor(
    id: number,
    image: string,
    name: string,
    types: string[],
    height: number,
    weight: number,
    abilities: string[],
    egg_groups: string[],
    stats: Stats,
    genus: string,
    description: string
  ) {
    super(id, image, name, types);
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.egg_groups = egg_groups;
    this.stats = stats;
    this.genus = genus;
    this.description = description;
  }
}
