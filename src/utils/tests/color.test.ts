import {
  textColor,
  stringColorToHex,
  addHexAlpha,
  randomColor,
} from '../color';
const black = '#000000';
const unhashedBlack = '000000';
const unhashedShortBlack = '000';
const shortBlack = '#000';
const white = '#ffffff';
const shortWhite = '#fff';
const yellow = '#ffff00';

describe('textColor', () => {
  test('returns white for black', () => {
    expect(textColor(black)).toBe('white');
  });
  test('returns black for white', () => {
    expect(textColor(white)).toBe('black');
  });
  test('returns white for shortBlack', () => {
    expect(textColor(shortBlack)).toBe('white');
  });
  test('returns black for shortWhite', () => {
    expect(textColor(shortWhite)).toBe('black');
  });
  test('returns black for yellow', () => {
    expect(textColor(yellow)).toBe('black');
  });
  test('returns white for unhashedBlack', () => {
    expect(textColor(unhashedBlack)).toBe('white');
  });
  test('returns white for unhashedShortBlack', () => {
    expect(textColor(unhashedShortBlack)).toBe('white');
  });
});

describe('stringColorToHex', () => {
  test('returns #000000 for black', () => {
    expect(stringColorToHex('black')).toBe(black);
  });
  test('returns #ffffff for white', () => {
    expect(stringColorToHex('white')).toBe(white);
  });
  test('returns #ffffff for WHITE', () => {
    expect(stringColorToHex('WHITE')).toBe(white);
  });
  test('returns #ffff00 for yellow', () => {
    expect(stringColorToHex('yellow')).toBe(yellow);
  });
  test('returns invalidcolor for invalidcolor', () => {
    expect(stringColorToHex('invalidcolor')).toBe('invalidcolor');
  });
});

describe('addHexAlpha', () => {
  const alphaHex = '80';
  const alphaDecimal = 0.5;

  test('returns #000000ff for black and 1', () => {
    expect(addHexAlpha(black, 1)).toBe(black + 'ff');
  });
  test('returns #00000000 for black and 0', () => {
    expect(addHexAlpha(black, 0)).toBe(black + '00');
  });
  test('returns #00000080 for black', () => {
    expect(addHexAlpha(black, alphaDecimal)).toBe(black + alphaHex);
  });
  test('returns #ffffff80 for white', () => {
    expect(addHexAlpha(white, alphaDecimal)).toBe(white + alphaHex);
  });
  test('returns #ffffff0d for white and 0.05', () => {
    expect(addHexAlpha(white, 0.05)).toBe(white + '0d');
  });
  test('returns #00000080 for shortBlack', () => {
    expect(addHexAlpha(shortBlack, alphaDecimal)).toBe(black + alphaHex);
  });
  test('returns #00000080 for unhashedBlack', () => {
    expect(addHexAlpha(unhashedBlack, alphaDecimal)).toBe(black + alphaHex);
  });
  test('returns #00000080 for unhashedShortBlack', () => {
    expect(addHexAlpha(unhashedShortBlack, alphaDecimal)).toBe(
      black + alphaHex
    );
  });
  test('returns #ffffff80 for shortWhite', () => {
    expect(addHexAlpha(shortWhite, alphaDecimal)).toBe(white + alphaHex);
  });
});

describe('randomColor', () => {
  test('runs without exceptions', () => {
    expect(randomColor).not.toThrow();
  });
});
