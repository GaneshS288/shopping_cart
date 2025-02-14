import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import App from './App.jsx';

describe('App', () => {
  it('renders headline', () => {
    render(<App title="React" />);

    expect(screen.getByRole("heading").textContent).toBe("Vite + React");
    

    // check if App components renders headline
  });
});