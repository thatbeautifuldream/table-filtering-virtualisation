import * as React from "react";
import { Filter } from "lucide-react";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/lib/utils";

export interface FilterOption {
	value: string;
	label: string;
}

export interface FilterDropdownProps {
	options: FilterOption[];
	selectedValues: string[];
	onChange: (values: string[]) => void;
	label?: string;
}

function FilterDropdown({
	options,
	selectedValues,
	onChange,
	label = "Filter",
}: FilterDropdownProps) {
	const handleToggle = (value: string, checked: boolean) => {
		if (checked) {
			onChange([...selectedValues, value]);
		} else {
			onChange(selectedValues.filter((v) => v !== value));
		}
	};

	const activeCount = selectedValues.length;
	const isActive = activeCount > 0;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" size="icon-xs" className="relative" />}
			>
				<Filter
					className={cn(
						"h-3.5 w-3.5 transition-all",
						isActive
							? "fill-primary text-primary"
							: "fill-none text-muted-foreground",
					)}
				/>
				{isActive && (
					<span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-3 min-w-3 px-0.5 text-[9px] font-semibold text-primary-foreground bg-primary rounded-full ring-1 ring-background">
						{activeCount}
					</span>
				)}
				<span className="sr-only">{label}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{options.map((option) => (
					<DropdownMenuCheckboxItem
						key={option.value}
						checked={selectedValues.includes(option.value)}
						onCheckedChange={(checked) =>
							handleToggle(option.value, checked === true)
						}
					>
						{option.label}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { FilterDropdown };
