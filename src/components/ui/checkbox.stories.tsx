import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "UI/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {
		checked: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
		indeterminate: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		label: "Accept terms and conditions",
	},
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
	},
};

export const Checked: Story = {
	args: {
		label: "Checked checkbox",
		checked: true,
	},
	render: (args) => {
		const [checked, setChecked] = useState(true);
		return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
	},
};

export const Indeterminate: Story = {
	args: {
		label: "Indeterminate checkbox",
		indeterminate: true,
	},
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
	},
};

export const Disabled: Story = {
	args: {
		label: "Disabled checkbox",
		disabled: true,
	},
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
	},
};

export const WithoutLabel: Story = {
	args: {},
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
	},
};
