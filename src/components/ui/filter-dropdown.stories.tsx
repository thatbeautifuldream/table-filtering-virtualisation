import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterDropdown } from "./filter-dropdown";

const meta: Meta<typeof FilterDropdown> = {
	title: "UI/FilterDropdown",
	component: FilterDropdown,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="p-8">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof FilterDropdown>;

const healthOptions = [
	{ value: "Healthy", label: "Healthy" },
	{ value: "Injured", label: "Injured" },
	{ value: "Critical", label: "Critical" },
];

export const Default: Story = {
	args: {
		options: healthOptions,
		label: "Filter by health",
	},
	render: (args) => {
		const [selectedValues, setSelectedValues] = useState<string[]>([]);
		return (
			<FilterDropdown
				{...args}
				selectedValues={selectedValues}
				onChange={setSelectedValues}
			/>
		);
	},
};

export const WithSelectedFilters: Story = {
	args: {
		options: healthOptions,
		label: "Filter by health",
	},
	render: (args) => {
		const [selectedValues, setSelectedValues] = useState<string[]>([
			"Healthy",
			"Injured",
		]);
		return (
			<FilterDropdown
				{...args}
				selectedValues={selectedValues}
				onChange={setSelectedValues}
			/>
		);
	},
};

export const AllSelected: Story = {
	args: {
		options: healthOptions,
		label: "Filter by health",
	},
	render: (args) => {
		const [selectedValues, setSelectedValues] = useState<string[]>([
			"Healthy",
			"Injured",
			"Critical",
		]);
		return (
			<FilterDropdown
				{...args}
				selectedValues={selectedValues}
				onChange={setSelectedValues}
			/>
		);
	},
};
