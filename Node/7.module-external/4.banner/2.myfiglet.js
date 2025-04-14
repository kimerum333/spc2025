//나라면 어떻게 짤 것인가??

const asciiFont = {
    H: [
        '| |',
        '|-|',
        '| |',
    ],
    E: [
        '|--',
        '|- ',
        '|__',
    ],
    L: [
        '|  ',
        '|  ',
        '|__',
    ],
    O: [
        '/\\',
        '| |',
        '\\/',
    ],
}

function printAsciiArt(text){
    const chars = text.toUpperCase().split('');
    for (let i = 0; i < 3; i++) {
        let line = '';
        for (const char of chars) {
            line += asciiFont[char][i] + '  ';
        }
        console.log(line);
    }

}

printAsciiArt('hello');