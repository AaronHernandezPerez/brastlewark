import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavBar from '.';

export default {
  title: 'NavBar',
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

const input = (
  <input
    type="search"
    name="search"
    placeholder="Search"
    className="flex-grow px-4 rounded-lg focus:outline-none"
  />
);

export const Search = Template.bind({});
Search.args = { children: input };
