import { render, fireEvent, screen } from '@testing-library/react';

import ScrollObserver from '.';

describe('ScrollObserver detection', () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockImplementation((callback, options) => {
      callback([
        {
          isIntersecting: true,
        },
      ]);

      return {
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
      };
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const callback = jest.fn();
  test('tests onIntersect is called when reaching the component', () => {
    // We cant test IntersectionObserver, so it test the callback works
    render(
      <div data-testid="scroll-parent">
        <div style={{ height: 1000 }}></div>
        <ScrollObserver onIntersect={callback} />
      </div>
    );
    const scrollParent = screen.getByTestId('scroll-parent');
    fireEvent.scroll(scrollParent, { y: 1000 });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
