import { render, screen, fireEvent } from '@testing-library/react';
import GnomeFilters from '.';
import { professions } from 'types';

test('Tests it properly displays the name', () => {
  const profession = '';
  const setProfession = jest.fn();
  render(
    <GnomeFilters profession={profession} setProfession={setProfession} />
  );

  professions.forEach((p) => {
    screen.getByText(p.trim());
  });

  const select = screen.getByLabelText('Profession');
  fireEvent.change(select, { target: { value: profession[1] } });
  expect(setProfession).toHaveBeenCalledTimes(1);
});
