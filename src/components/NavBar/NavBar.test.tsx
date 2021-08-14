import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NavBar from '.';
describe('NavBar component', () => {
  test('tests the the root component', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const linkElement = screen.getByText(/Brastlewark/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('tests the the root component with children', () => {
    const header = <h1>Header!</h1>;
    render(
      <Router>
        <NavBar>{header}</NavBar>
      </Router>
    );
    const linkElement = screen.getByText(/Header!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
