import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <div style={{ padding: 50 }}>
    <Select
      {...args}
      options={[
        "Phoenix Baker",
        "Olivia Rhye",
        "Lana Steiner",
        "Demi Wilkinson",
        "Candice Wu",
        "Natali Craig",
        "Drew Cano",
      ]}
      icon="/icons/user.svg"
    />
  </div>
);

export const Default = Template.bind({});
