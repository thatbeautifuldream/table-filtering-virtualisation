import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface SearchInputProps
	extends React.ComponentProps<typeof Input> {
	placeholder?: string;
}

function SearchInput({
	placeholder = "Search...",
	className,
	...props
}: SearchInputProps) {
	return (
		<div className="relative">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
			<Input
				type="text"
				placeholder={placeholder}
				className={cn("pl-10", className)}
				{...props}
			/>
		</div>
	);
}

export { SearchInput };
