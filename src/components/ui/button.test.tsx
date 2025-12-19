import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
	it("renders with children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button")).toHaveTextContent("Click me");
	});

	it("calls onClick when clicked", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick}>Click me</Button>);
		const button = screen.getByRole("button");

		await user.click(button);

		expect(handleClick).toHaveBeenCalled();
	});

	it("is disabled when disabled prop is true", () => {
		render(<Button disabled>Click me</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("applies variant styles via className", () => {
		render(<Button variant="default">Primary</Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("bg-primary");
	});

	it("applies variant styles for secondary", () => {
		render(<Button variant="secondary">Secondary</Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("bg-secondary");
	});
});
