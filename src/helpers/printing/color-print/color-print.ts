import { textColors } from './color-mapping';

export type Color = keyof typeof textColors;

export const colorPrint = (color: Color, text: string) => {
    console.log(`${textColors[color]}${text} ${textColors.Reset}`.trim());
};
export const getColorText = (color: Color, text: string) => `${textColors[color]}${text} ${textColors.Reset}`.trim();
