import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { getRandomGnomes } from 'utils/tests';
import GnomeLibrary from '.';

const randomGnomes = getRandomGnomes();

jest.mock('components/ScrollObserver', () => () => <div></div>);

describe('GnomeLibrary state', () => {
  test('tests initial loading state', () => {
    render(
      <Router>
        <GnomeLibrary />
      </Router>
    );
    const spinner = screen.getByTitle('Loading');
    expect(spinner).toBeInTheDocument();
  });

  test('tests error in data retrieval', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet().reply(404);

    render(
      <Router>
        <GnomeLibrary />
      </Router>
    );
    await waitFor(() => screen.getAllByText('Error retrieving citizens'));
    expect(mock.history.get.length).toBe(1);
  });

  test('tests successful data retrieval with different data', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet().reply(200, { Betrunken: randomGnomes });

    render(
      <Router>
        <GnomeLibrary />
      </Router>
    );
    await waitFor(() => screen.getAllByText('Error retrieving citizens'));
    expect(mock.history.get.length).toBe(1);
  });

  test('tests successful data retrieval', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet().reply(200, { Brastlewark: randomGnomes });

    render(
      <Router>
        <GnomeLibrary />
      </Router>
    );
    await waitFor(() => screen.getAllByText(randomGnomes[0].name));
    expect(mock.history.get.length).toBe(1);
  });
});
