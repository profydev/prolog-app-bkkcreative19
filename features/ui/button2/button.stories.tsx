/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button2 } from "./button2";

export default {
  title: "UI/Button",
  component: Button2,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Button2>;

const Template: ComponentStory<typeof Button2> = (args) => (
  <div style={{ padding: 50 }}>
    <Button2 {...args}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6023 1.66666 9.99996 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 9.99999C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Button CTA
    </Button2>
  </div>
);

export const Default = Template.bind({});
// Default.args = {
//   size: ButtonSize.sm,
//   color: ButtonColor.primary,
// };
// Default.parameters = {
//   viewMode: "docs",
// };
