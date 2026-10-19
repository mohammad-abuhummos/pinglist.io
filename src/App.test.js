import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the company name', async () => {
  render(<App />);
  expect(screen.getAllByText(/pinglist\.io/i).length).toBeGreaterThan(0);
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});
