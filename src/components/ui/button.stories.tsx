import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "UI/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"outline",
				"secondary",
				"ghost",
				"destructive",
				"link",
			],
		},
		size: {
			control: "select",
			options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
		},
		disabled: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Default Button",
		variant: "default",
		size: "default",
	},
};

export const Outline: Story = {
	args: {
		children: "Outline Button",
		variant: "outline",
		size: "default",
	},
};

export const Secondary: Story = {
	args: {
		children: "Secondary Button",
		variant: "secondary",
		size: "default",
	},
};

export const Ghost: Story = {
	args: {
		children: "Ghost Button",
		variant: "ghost",
		size: "default",
	},
};

export const Destructive: Story = {
	args: {
		children: "Destructive Button",
		variant: "destructive",
		size: "default",
	},
};

export const Small: Story = {
	args: {
		children: "Small Button",
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		children: "Large Button",
		size: "lg",
	},
};

export const Disabled: Story = {
	args: {
		children: "Disabled Button",
		disabled: true,
	},
};
