import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
	title: "UI/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"secondary",
				"destructive",
				"outline",
				"ghost",
				"link",
				"healthy",
				"injured",
				"critical",
			],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: {
		children: "Badge",
		variant: "default",
	},
};

export const Secondary: Story = {
	args: {
		children: "Secondary",
		variant: "secondary",
	},
};

export const Destructive: Story = {
	args: {
		children: "Destructive",
		variant: "destructive",
	},
};

export const Outline: Story = {
	args: {
		children: "Outline",
		variant: "outline",
	},
};

export const Ghost: Story = {
	args: {
		children: "Ghost",
		variant: "ghost",
	},
};

export const Healthy: Story = {
	args: {
		children: "Healthy",
		variant: "healthy",
	},
};

export const Injured: Story = {
	args: {
		children: "Injured",
		variant: "injured",
	},
};

export const Critical: Story = {
	args: {
		children: "Critical",
		variant: "critical",
	},
};

export const AllHealthVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="healthy">Healthy</Badge>
			<Badge variant="injured">Injured</Badge>
			<Badge variant="critical">Critical</Badge>
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap gap-2">
				<h3 className="w-full text-sm font-medium mb-2">Standard Variants</h3>
				<Badge variant="default">Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="destructive">Destructive</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="ghost">Ghost</Badge>
			</div>
			<div className="flex flex-wrap gap-2">
				<h3 className="w-full text-sm font-medium mb-2">
					Health Status Variants
				</h3>
				<Badge variant="healthy">Healthy</Badge>
				<Badge variant="injured">Injured</Badge>
				<Badge variant="critical">Critical</Badge>
			</div>
		</div>
	),
};

export const WithUppercase: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="healthy" className="uppercase tracking-wider text-xs">
				Healthy
			</Badge>
			<Badge variant="injured" className="uppercase tracking-wider text-xs">
				Injured
			</Badge>
			<Badge variant="critical" className="uppercase tracking-wider text-xs">
				Critical
			</Badge>
		</div>
	),
};
