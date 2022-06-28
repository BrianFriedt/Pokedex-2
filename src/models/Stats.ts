export class Stats {
  hp: number;
  speed: number;
  defense: number;
  special_attack: number;
  special_defense: number;

  constructor(hp: number, speed: number, defense: number, special_attack: number, special_defense: number) {
    this.hp = hp;
    this.speed = speed;
    this.defense = defense;
    this.special_attack = special_attack;
    this.special_defense = special_defense;
  }
}
