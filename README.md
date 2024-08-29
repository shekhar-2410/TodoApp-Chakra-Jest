# Todo Component

## Description

The `Todo` component is a simple React component that allows users to add, edit, delete, and mark todos as completed. The component uses Chakra UI for styling and interacts with a mock API for demonstration purposes.

### Features

- Add new todos.
- Edit existing todos.
- Delete todos.
- Mark todos as completed.
- Make Api call for save all todos.

## Component Structure

- **Input Field**: Allows users to enter the todo text.
- **Add Todo Button**: Adds the entered todo to the list.
- **Todo List**: Displays all added todos with options to edit, delete, or mark them as completed.
- **Buttons**: 
  - **Edit**: Opens a prompt to change the todo text.
  - **Delete**: Removes the todo from the list.
  - **Complete**: Toggles the completed state of the todo.

## Technologies Used

- **React**: For creating the component.
- **Chakra UI**: For UI components and styling.
- **Jest and React Testing Library**: For writing and running test cases.

## Test Cases

The test cases for the `Todo` component cover the following scenarios:

1. **Rendering**:
   - Ensures the `Todo` component renders correctly with the input field and buttons.

2. **Adding Todos**:
   - Verifies that the user can add a new todo by entering text and clicking the "Add Todo" button.
   - Checks if the `fetch` API is called with the correct parameters when adding a todo.

3. **Deleting Todos**:
   - Confirms that clicking the "Delete" button removes the correct todo from the list.

4. **Editing Todos**:
   - Validates that clicking the "Edit" button allows the user to change the todo text.

5. **Marking Todos as Completed**:
   - Tests that clicking a todo marks it as completed or uncompleted.
  
6. **Api call test**:
   - Calls fetch with correct parameters when 'Add Todo' button is clicked.

## How to Run Tests

- To run the tests for the `Todo` component, use the following command:

```bash
npm test

## Make sure to have all dependencies installed by running:
npm install

## Folder Structure
Todo-app/
│
├── src/
│   ├── components/
│   │   └── Todo.js
│   ├── __tests__/
│   │   └── Todo.test.js
│   └── index.js
├── README.md
└── package.json

##  How to Clone and Run Locally

1. **Clone the Repository**:
git clone https://github.com/yourusername/your-repo.git

2. **Navigate to the Project Directory**:
cd my-react-app

3. **Install Dependencies**:
npm install

4: **Run the Application**:
npm start

5. **Run Test**:
npm run test
