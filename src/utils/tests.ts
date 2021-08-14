import { randomColor } from 'utils/color';
import { Gnome } from 'types';

export const testGnome: Gnome = {
  id: 0,
  name: 'Tobus Quickwhistle',
  thumbnail:
    'http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg',
  age: 306,
  weight: 39.065952,
  height: 107.75835,
  hair_color: 'Pink',
  professions: [
    'Metalworker',
    'Woodcarver',
    'Stonecarver',
    ' Tinker',
    'Tailor',
    'Potter',
  ],
  friends: ['Cogwitz Chillwidget', 'Tinadette Chillbuster'],
  gender: 'male',
};

export function getRandomGnomes() {
  const gnomesArr = [];

  for (let i = 0; i < 40; i++) {
    gnomesArr.push({ ...testGnome, id: i, hair_color: randomColor() });
  }

  return gnomesArr;
}
