import { getPageElements } from '../libraries';

describe('getPageElements', () => {
  test('getting page', () => {
    expect(getPageElements(10, 10, 1000)).toBe(1000);
  });

  test('getting page greater than max', () => {
    expect(getPageElements(10000, 10, 1000)).toBe(1000);
  });
});
