import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import GnomeProvider from 'state/GnomeContext';
import { getRandomGnomes } from 'utils/tests';
import GnomeDetails from '.';

const randomGnomes = getRandomGnomes();

jest.mock('components/ScrollObserver', () => () => <div></div>);

describe('GnomeDetails state', () => {
  test('tests initial loading state', () => {
    render(
      <GnomeProvider>
        <Router>
          <GnomeDetails />
        </Router>
      </GnomeProvider>
    );
    const spinner = screen.getByTitle('Loading');
    expect(spinner).toBeInTheDocument();
  });

  test('tests error in data retrieval', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet().reply(404);

    render(
      <GnomeProvider>
        <Router>
          <GnomeDetails />
        </Router>
      </GnomeProvider>
    );
    await waitFor(() => screen.getAllByText('Error retrieving citizens'));
    expect(mock.history.get.length).toBe(1);
  });

  test('tests successful data retrieval with different data', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet().reply(200, { Betrunken: randomGnomes });

    render(
      <GnomeProvider>
        <Router>
          <GnomeDetails />
        </Router>
      </GnomeProvider>
    );
    await waitFor(() => screen.getAllByText('Error retrieving citizens'));
    expect(mock.history.get.length).toBe(1);
  });

  test('tests successful data retrieval', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet().reply(200, { Brastlewark: randomGnomes });

    render(
      <GnomeProvider>
        <MemoryRouter initialEntries={['/gnomes/0']}>
          <Route path="/gnomes/:id">
            <GnomeDetails />
          </Route>
        </MemoryRouter>
      </GnomeProvider>
    );
    await waitFor(() => screen.getAllByText(randomGnomes[0].name));
    expect(mock.history.get.length).toBe(1);
  });
});
