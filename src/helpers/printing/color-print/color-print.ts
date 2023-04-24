import colors from './color-mapping';

export type Color = keyof typeof colors;

export const colorPrint = (color: Color, text: string) => {
    console.log(`${colors[color]}${text} ${colors.Reset}`.trim());
};
