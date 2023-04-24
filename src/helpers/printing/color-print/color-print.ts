import colors from './color-mapping';

type Color = keyof typeof colors;

export const colorPrint = (color: Color, text: string) => `${colors[color]}${text} ${colors.Reset}`.trim();
