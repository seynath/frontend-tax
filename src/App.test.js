// Import necessary modules from '@testing-library/react' for testing a React component.
import { render, screen } from '@testing-library/react';

// Import the App component that you want to test.
import App from './App';

// Create a test case with a descriptive name.
test('renders learn react link', () => {
  // Render the App component.
  render(<App />);

  // Find an element with the text "learn react" (case-insensitive) in the rendered output.
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the found element is in the document.
  expect(linkElement).toBeInTheDocument();
});

