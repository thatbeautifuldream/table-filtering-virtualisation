import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
	"peer inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-input bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
);

export interface CheckboxProps
	extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "checked">,
		VariantProps<typeof checkboxVariants> {
	label?: string;
	indeterminate?: boolean;
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({
	className,
	label,
	indeterminate,
	checked,
	onChange,
	onCheckedChange,
	...props
}: CheckboxProps) {
	const handleChange = (newChecked: boolean) => {
		if (onCheckedChange) {
			onCheckedChange(newChecked);
		}
		// For compatibility with traditional onChange
		if (onChange) {
			const event = {
				target: { checked: newChecked },
			} as React.ChangeEvent<HTMLInputElement>;
			onChange(event);
		}
	};

	return (
		<label className="inline-flex items-center gap-2 cursor-pointer">
			<CheckboxPrimitive.Root
				className={cn(checkboxVariants(), className)}
				checked={indeterminate ? "indeterminate" : checked}
				onCheckedChange={handleChange}
				{...props}
			>
				<CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
					{indeterminate ? (
						<Minus className="h-3 w-3" />
					) : (
						<Check className="h-3 w-3" />
					)}
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			{label && <span className="text-sm text-foreground">{label}</span>}
		</label>
	);
}

export { Checkbox };
