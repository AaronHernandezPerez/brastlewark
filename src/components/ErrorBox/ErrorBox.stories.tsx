import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorBox from '.';

export default {
  title: 'ErrorBox',
  component: ErrorBox,
} as ComponentMeta<typeof ErrorBox>;

const Template: ComponentStory<typeof ErrorBox> = (args) => (
  <div>
    <ErrorBox>Error message!</ErrorBox>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
