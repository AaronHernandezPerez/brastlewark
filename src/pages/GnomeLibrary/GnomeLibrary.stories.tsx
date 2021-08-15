import { BrowserRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import GnomeProvider from 'context/GnomeContext';
import GnomeLibrary from '.';
import { getRandomGnomes } from 'utils/tests';

export default {
  title: 'GnomeLibrary',
  component: GnomeLibrary,
} as ComponentMeta<typeof GnomeLibrary>;

const Template: ComponentStory<typeof GnomeLibrary> = (args) => (
  <GnomeProvider>
    <Router>
      <GnomeLibrary {...args} />
    </Router>
  </GnomeProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  (Story) => {
    const mock = new MockAdapter(axios);
    mock.onGet().reply(200, { Brastlewark: getRandomGnomes() });

    return <Story />;
  },
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
  (Story) => {
    const mock = new MockAdapter(axios);
    mock.onGet().timeoutOnce();

    return <Story />;
  },
];
