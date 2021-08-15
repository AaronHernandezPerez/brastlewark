import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import GnomeProvider from 'context/GnomeContext';
import GnomeDetails from '.';
import { getRandomGnomes } from 'utils/tests';

export default {
  title: 'GnomeDetails',
  component: GnomeDetails,
} as ComponentMeta<typeof GnomeDetails>;

const Template: ComponentStory<typeof GnomeDetails> = (args) => (
  <GnomeProvider>
    <GnomeDetails />
  </GnomeProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  (Story) => {
    const mock = new MockAdapter(axios);
    mock.onGet().reply(200, { Brastlewark: getRandomGnomes() });

    return (
      <MemoryRouter initialEntries={['/gnomes/0']}>
        <Route path="/gnomes/:id">
          <Story />
        </Route>
      </MemoryRouter>
    );
  },
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
  (Story) => {
    const mock = new MockAdapter(axios);
    mock.onGet().timeoutOnce();

    return (
      <Router>
        <Story />
      </Router>
    );
  },
];

export const IndexError = Template.bind({});
IndexError.args = {};
IndexError.decorators = [
  (Story) => {
    const mock = new MockAdapter(axios);
    mock.onGet().reply(200, { Brastlewark: getRandomGnomes() });

    return (
      <MemoryRouter initialEntries={['/gnomes/999']}>
        <Route path="/gnomes/:id">
          <Story />
        </Route>
      </MemoryRouter>
    );
  },
];
