import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "./select";
import { SelectOption } from "./select-option";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Select>;

const arr = ["Error", "Warning", "Info"];

const Template: ComponentStory<typeof Select> = (args) => (
  <div style={{ padding: 50 }}>
    <Select {...args}>
      {arr.map((item: string) => {
        return (
          <SelectOption value={item} key={item}>

            {item}
          </SelectOption>
        );
      })}
    </Select>
  </div>
);

export const Default = Template.bind({});
