import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput } from "./search-input";

const meta: Meta<typeof SearchInput> = {
	title: "UI/SearchInput",
	component: SearchInput,
	tags: ["autodocs"],
	argTypes: {
		placeholder: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
	args: {
		placeholder: "Search...",
	},
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<SearchInput
				{...args}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

export const WithCustomPlaceholder: Story = {
	args: {
		placeholder: "Search characters...",
	},
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<SearchInput
				{...args}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

export const WithValue: Story = {
	args: {
		placeholder: "Search characters...",
	},
	render: (args) => {
		const [value, setValue] = useState("Naruto");
		return (
			<SearchInput
				{...args}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

export const Disabled: Story = {
	args: {
		placeholder: "Search...",
		disabled: true,
	},
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<SearchInput
				{...args}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};
