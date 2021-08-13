export type Profession =
  | 'Metalworker'
  | 'Woodcarver'
  | 'Stonecarver'
  | ' Tinker'
  | 'Tailor'
  | 'Potter'
  | 'Brewer'
  | 'Medic'
  | 'Prospector'
  | 'Gemcutter'
  | 'Mason'
  | 'Cook'
  | 'Baker'
  | 'Miner'
  | 'Carpenter'
  | 'Farmer'
  | 'Tax inspector'
  | 'Smelter'
  | 'Butcher'
  | 'Sculptor'
  | 'Blacksmith'
  | 'Mechanic'
  | 'Leatherworker'
  | 'Marble Carver';

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
