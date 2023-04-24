import { colorPrint } from './color-print';

export const printLog = (text: string) => {
    colorPrint('FgYellow', `[!] ${text.replace(new RegExp('\\n', 'g'), '\n    ')}\n`);
};
