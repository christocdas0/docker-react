import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio sections', () => {
  render(<App />);
  
  // Check if main sections are present
  expect(screen.getByText(/Hey there/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Full Stack Developer/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
  expect(screen.getByText(/My Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/My Services/i)).toBeInTheDocument();
  // "Get In Touch" appears twice (button and heading), so use getAllByText
  expect(screen.getAllByText(/Get In Touch/i).length).toBeGreaterThan(0);
});

test('renders navigation menu', () => {
  render(<App />);
  
  // Check if navigation links are present
  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Experience/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Projects/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
});

test('renders logo and navigation', () => {
  render(<App />);
  
  // Check if the logo is present
  expect(screen.getAllByText('CC').length).toBeGreaterThan(0);
  
  // Check if navigation is present
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
