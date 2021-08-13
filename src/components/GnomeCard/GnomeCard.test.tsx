import React from 'react';
import { render, screen } from '@testing-library/react';
import GnomeCard from '.';
import { Gnome } from 'types';
const testGnome: Gnome = {
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
};

test('Tests it properly displays the name', () => {
  render(<GnomeCard gnome={testGnome} />);
  const nameEl = screen.getByText(new RegExp(testGnome.name));
  expect(nameEl).toBeInTheDocument();

  const imgEl = screen.getAllByAltText('Gnome thumbnail');
  expect(imgEl.length).toBe(1);
  expect(imgEl[0]).toHaveAttribute('src', testGnome.thumbnail);
});
