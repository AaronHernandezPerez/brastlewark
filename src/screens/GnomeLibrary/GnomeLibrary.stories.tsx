import { ComponentStory, ComponentMeta } from '@storybook/react';

import GnomeLibrary from '.';

export default {
  title: 'GnomeLibrary',
  component: GnomeLibrary,
} as ComponentMeta<typeof GnomeLibrary>;

const Template: ComponentStory<typeof GnomeLibrary> = (args) => (
  <GnomeLibrary {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
