import { round } from '../math';

describe('round', () => {
  test('normal case', () => {
    expect(round(21241.56412)).toBe(21241.56);
  });
  test('case to 4 places', () => {
    expect(round(21241.56499, 4)).toBe(21241.565);
  });
  test('edge case', () => {
    expect(round(1.005)).toBe(1.01);
  });

  test('edge case one decimal', () => {
    expect(round(1.005, 1)).toBe(1.0);
  });

  test('edge case two', () => {
    expect(round(4.015)).toBe(4.02);
  });

  test('edge case two one decimal', () => {
    expect(round(4.015, 1)).toBe(4.0);
  });
});
