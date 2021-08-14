import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import GnomeCard from '.';
import { testGnome } from 'utils/tests';

test('Tests it properly displays the name', () => {
  render(
    <Router>
      <GnomeCard gnome={testGnome} />{' '}
    </Router>
  );
  const nameEl = screen.getByText(new RegExp(testGnome.name));
  expect(nameEl).toBeInTheDocument();

  const imgEl = screen.getAllByAltText('Gnome thumbnail');
  expect(imgEl.length).toBe(1);
  expect(imgEl[0]).toHaveAttribute('src', testGnome.thumbnail);
});
