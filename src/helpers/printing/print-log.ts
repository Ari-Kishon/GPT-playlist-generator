import { Color, getColorText } from './color-print';

export const printLog = (on: boolean, text: string, color: Color = 'FgYellow') => {
    if (on) console.log(`${getColorText(color, `[!] ${text.replace(new RegExp('\\n', 'g'), '\n    ')}`)}\n`);
};
