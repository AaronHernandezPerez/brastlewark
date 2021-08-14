export const professions = [
  'Metalworker',
  'Woodcarver',
  'Stonecarver',
  ' Tinker',
  'Tailor',
  'Potter',
  'Brewer',
  'Medic',
  'Prospector',
  'Gemcutter',
  'Mason',
  'Cook',
  'Baker',
  'Miner',
  'Carpenter',
  'Farmer',
  'Tax inspector',
  'Smelter',
  'Butcher',
  'Sculptor',
  'Blacksmith',
  'Mechanic',
  'Leatherworker',
  'Marble Carver',
] as const;

export type Profession = typeof professions[number];

export type Gnome = {
  id: number;
  name: string;
  thumbnail: string;
  age: number;
  weight: number;
  height: number;
  hair_color: string;
  professions: Array<Profession>;
  friends: Array<string>;
};
