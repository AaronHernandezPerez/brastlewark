import { BrowserRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GnomeDetailsCard from '.';
import { testGnome } from 'utils/tests';

export default {
  title: 'GnomeDetailsCard',
  component: GnomeDetailsCard,
} as ComponentMeta<typeof GnomeDetailsCard>;

const Template: ComponentStory<typeof GnomeDetailsCard> = (args) => (
  <Router>
    <GnomeDetailsCard {...args} />{' '}
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {
  gnome: testGnome,
};
