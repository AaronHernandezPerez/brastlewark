import { ComponentStory, ComponentMeta } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import GnomeLibrary from '.';
import { getRandomGnomes } from 'utils/tests';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, { Brastlewark: getRandomGnomes() });

export default {
  title: 'GnomeLibrary',
  component: GnomeLibrary,
} as ComponentMeta<typeof GnomeLibrary>;

const Template: ComponentStory<typeof GnomeLibrary> = (args) => (
  <GnomeLibrary {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
