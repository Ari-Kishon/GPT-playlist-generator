import { Color, colorPrint } from './color-print';

export const printLog = (on: boolean, text: string, color: Color = 'FgYellow') => {
    if (on) colorPrint(color, `[!] ${text.replace(new RegExp('\\n', 'g'), '\n    ')}\n`);
};
