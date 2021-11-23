import React from "react";
import { render, screen } from "@testing-library/react";
import Challenge from "./challenge";

test("Challenge page renders without crashing", () => {
	render(<Challenge />);
	}
);

test("Challenge page renders the title", () => {
	render(<Challenge />);
	const title = screen.getByText("Rick&Morty Challengue");
	expect(title).toBeInTheDocument();
});