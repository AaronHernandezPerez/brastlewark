import { BrowserRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GnomeCard from '.';
import { testGnome } from 'utils/tests';

export default {
  title: 'GnomeCard',
  component: GnomeCard,
} as ComponentMeta<typeof GnomeCard>;

const Template: ComponentStory<typeof GnomeCard> = (args) => (
  <Router>
    <GnomeCard {...args} />{' '}
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {
  gnome: testGnome,
};
