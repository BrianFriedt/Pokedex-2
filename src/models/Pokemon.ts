export class Pokemon {
  id: number;
  image: string;
  name: string;
  types: string[];

  constructor(id: number, image: string, name: string, types: string[]) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.types = types;
  }
}
