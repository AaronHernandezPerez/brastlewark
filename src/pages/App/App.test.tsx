import { render, screen } from '@testing-library/react';
import App from '.';

jest.mock('pages/GnomeLibrary', () => () => <div>Gnome library!</div>);

test('tests the the root component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Gnome library!/i);
  expect(linkElement).toBeInTheDocument();
});
