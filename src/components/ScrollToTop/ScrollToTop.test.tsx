import { render, fireEvent, screen } from '@testing-library/react';
import {
  BrowserRouter as Router,
  MemoryRouter,
  Route,
  Link,
} from 'react-router-dom';

import ScrollToTop from '.';

const scrollHeight = 5000;
const maxScrollHeight = scrollHeight * 10;
describe('ScrollToTop', () => {
  test('tests onIntersect is called when reaching the component', () => {
    // We cant test WindowScroll
    window.scrollTo = jest.fn();

    render(
      <MemoryRouter initialEntries={['/one']}>
        <ScrollToTop />
        <Route exact path="/one">
          <div data-testid="scroll-parent">
            <Link data-testid="link" to="/two" />
            <div style={{ height: maxScrollHeight }}></div>
          </div>
        </Route>
        <Route exact path="/two">
          <div data-testid="scroll-parent">
            <div style={{ height: maxScrollHeight }}></div>
          </div>
        </Route>
      </MemoryRouter>
    );

    const scrollParent = screen.getByTestId('scroll-parent');
    fireEvent.scroll(scrollParent, { y: scrollHeight });
    fireEvent.click(screen.getByTestId('link'));
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
