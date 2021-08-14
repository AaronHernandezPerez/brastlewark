import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spinner from '.';

export default {
  title: 'Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <div>
    <Spinner />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
