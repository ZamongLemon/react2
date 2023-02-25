import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    render(<Greeting />);

    /*   screen.getByText("hello world!", { exact: true });
        expect(); */
    const helloWorldElement = screen.getByText("hello world!");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("it's good to see you", () => {
    render(<Greeting />);
    const welcomeText = screen.getByText("good to see you", { exact: false });
    expect(welcomeText).toBeInTheDocument();
  });

  test("renders 'Changed!' message after button click", () => {
    render(<Greeting />);
    const buttonElement = screen.getByRole("button");
    act(() => {
      fireEvent.click(buttonElement);
    });
    const changedText = screen.getByText("Changed!");
    expect(changedText).toBeInTheDocument();
  });
});
