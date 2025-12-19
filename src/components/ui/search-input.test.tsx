import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "./search-input";

describe("SearchInput", () => {
	it("renders with placeholder", () => {
		render(<SearchInput placeholder="Search characters..." />);
		expect(
			screen.getByPlaceholderText("Search characters..."),
		).toBeInTheDocument();
	});

	it("calls onChange when user types", async () => {
		const handleChange = vi.fn();
		const user = userEvent.setup();

		render(<SearchInput onChange={handleChange} />);
		const input = screen.getByRole("textbox");

		await user.type(input, "Naruto");

		expect(handleChange).toHaveBeenCalled();
		expect(input).toHaveValue("Naruto");
	});

	it("displays the provided value", () => {
		render(<SearchInput value="Sasuke" onChange={() => {}} />);
		expect(screen.getByRole("textbox")).toHaveValue("Sasuke");
	});

	it("renders search icon", () => {
		const { container } = render(<SearchInput />);
		const searchIcon = container.querySelector("svg");
		expect(searchIcon).toBeInTheDocument();
	});
});
