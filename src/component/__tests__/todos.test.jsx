import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Todo from "../Todo";

afterEach(() => {
  cleanup(); // Clean up after each test
});

// Render Test
test("renders Todo component", () => {
  render(<Todo />);
  const todoElement = screen.getByTestId("todo");
  expect(todoElement).toBeInTheDocument();
});

// Input Handling
test("input handling", () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Enter Todo");
  fireEvent.change(input, { target: { value: "test" } });
  expect(input.value).toBe("test");
});

// Add Todo
test("add items to todo", () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Enter Todo");
  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(screen.getByText("Add Todo"));
  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Delete Todo
test("delete items from todo", () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Enter Todo");
  fireEvent.change(input, { target: { value: "Todo to be Delete" } });
  fireEvent.click(screen.getByText("Add Todo"));
  fireEvent.click(screen.getByText("Delete"));
  expect(screen.queryByText("Todo to be Delete")).not.toBeInTheDocument();
});

// edit todo
test("edit todo", () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Enter Todo");
  fireEvent.change(input, { target: { value: "Todo to be update" } });
  fireEvent.click(screen.getByText("Add Todo"));
  fireEvent.click(screen.getByText("Edit"));
  expect(screen.getByText("Todo to be update")).toBeInTheDocument();
});

// mark todo as done
test("mark todo as done", () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Enter Todo");
  fireEvent.change(input, { target: { value: "Mark me as a done" } });
  fireEvent.click(screen.getByText("Add Todo"));
  fireEvent.click(screen.getByText("Mark me as a done"));
  expect(screen.getByText("Mark me as a done")).toHaveStyle(
    "text-decoration: line-through;"
  );
});

//  button is in the loading state when input is empty
test("checks if 'Add Todo' button is in loading state when input is empty", () => {
  render(<Todo />);
  const button = screen.getByRole("button", { name: /adding todo/i });
  expect(button).toBeDisabled();
});

// Button is enabled when input is not empty
test("checks if 'Add Todo' button is enabled when input is not empty", () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Enter Todo");
  fireEvent.change(input, { target: { value: "Add New Todo" } });

  const button = screen.getByRole("button", { name: /add todo/i });
  expect(button).not.toBeDisabled();
});

// api call test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("calls fetch with correct parameters when 'Add Todo' button is clicked", async () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Enter Todo");
  fireEvent.change(input, { target: { value: "Make a api call" } });
  fireEvent.click(screen.getByText("Add Todo"));

  expect(global.fetch).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/posts",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Todo",
        body: ["Make a api call"],
      }),
    })
  );

  expect(global.fetch).toHaveBeenCalledTimes(1);
});
