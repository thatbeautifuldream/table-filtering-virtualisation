import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
	it("renders with label", () => {
		render(<Checkbox label="Select all" />);
		expect(screen.getByText("Select all")).toBeInTheDocument();
	});

	it("calls onCheckedChange when clicked", async () => {
		const handleChange = vi.fn();
		const user = userEvent.setup();

		render(<Checkbox label="Test" onCheckedChange={handleChange} />);
		const checkbox = screen.getByRole("checkbox");

		await user.click(checkbox);

		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it("reflects checked state", () => {
		render(<Checkbox checked={true} onCheckedChange={() => {}} />);
		expect(screen.getByRole("checkbox")).toBeChecked();
	});

	it("reflects unchecked state", () => {
		render(<Checkbox checked={false} onCheckedChange={() => {}} />);
		expect(screen.getByRole("checkbox")).not.toBeChecked();
	});

	it("works with onChange prop for compatibility", async () => {
		const handleChange = vi.fn();
		const user = userEvent.setup();

		render(<Checkbox label="Test" onChange={handleChange} />);
		const checkbox = screen.getByRole("checkbox");

		await user.click(checkbox);

		expect(handleChange).toHaveBeenCalled();
		expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
	});
});
