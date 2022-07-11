import { Pokemon } from './Pokemon';
import { Stats } from './Stats';

export interface PokemonFull {
  id: number;
  image: string;
  name: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  egg_groups: string[];
  stats: Stats;
  genus: string;
  description: string;
}
