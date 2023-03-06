/* 
  This file contains functions for manipulating colors.

*/

// Take input hex color and a delta value and return a new hex color that is delta lighter or darker
export function adjustColor(hexColor: string, delta: number): string {
  // Convert hex color to RGB
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);
  // Adjust RGB values by delta
  const adjustedRed = clamp(red + delta, 0, 255);
  const adjustedGreen = clamp(green + delta, 0, 255);
  const adjustedBlue = clamp(blue + delta, 0, 255);
  // Convert adjusted RGB color to hex string
  const adjustedHex = `#${(
    (adjustedRed << 16) |
    (adjustedGreen << 8) |
    adjustedBlue
  )
    .toString(16)
    .padStart(6, '0')}`;
  return adjustedHex;
}

// Take two color inputs along with a percentage and return a color that is a percentage between the two colors
export function blendColors(
  color1: string,
  color2: string,
  interpolationValue: number
): string {
  const hex1 = color1.slice(1); // remove the '#' symbol
  const hex2 = color2.slice(1); // remove the '#' symbol
  // convert hex colors to RGB values
  const r1 = parseInt(hex1.slice(0, 2), 16);
  const g1 = parseInt(hex1.slice(2, 4), 16);
  const b1 = parseInt(hex1.slice(4, 6), 16);
  const r2 = parseInt(hex2.slice(0, 2), 16);
  const g2 = parseInt(hex2.slice(2, 4), 16);
  const b2 = parseInt(hex2.slice(4, 6), 16);
  // interpolate RGB values
  const r = Math.round((1 - interpolationValue) * r1 + interpolationValue * r2);
  const g = Math.round((1 - interpolationValue) * g1 + interpolationValue * g2);
  const b = Math.round((1 - interpolationValue) * b1 + interpolationValue * b2);
  // convert interpolated RGB values to hex color
  const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  return hex;
}

// Clamp a value between a min and max, breaking this out just in case we need it elsewhere on this page as we adjust colors
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
