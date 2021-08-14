import { ComponentStory, ComponentMeta } from '@storybook/react';

import GnomeFilters from '.';

export default {
  title: 'GnomeFilters',
  component: GnomeFilters,
} as ComponentMeta<typeof GnomeFilters>;

const Template: ComponentStory<typeof GnomeFilters> = (args) => (
  <div>
    <GnomeFilters {...args} />
  </div>
);

const setProfession = () => {};
export const Primary = Template.bind({});
Primary.args = {
  setProfession,
};
