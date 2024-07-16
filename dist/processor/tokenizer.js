export default class Tokenizer {
    argv;
    map;
    constructor(argv, map) {
        this.argv = argv;
        this.map = map;
    }
    tokenize() {
        const possibleTokens = this.argv;
        const tokens = [];
        if (!possibleTokens.length) {
            return [];
        }
        tokens.push({
            name: 'command',
            type: 'execution-string',
            value: possibleTokens.shift(),
        });
        for (const [index, token] of possibleTokens.entries()) {
            if (token.startsWith('-') || token.startsWith('-')) {
                const tokenDeclaration = token.startsWith('--') ? token.substring(2) : token.substring(1);
                const options = {};
                if (tokenDeclaration.includes('=')) {
                    const [name, value] = tokenDeclaration.split('=');
                    const mapName = this.getName(name, index + 1);
                    options.name = mapName.includes('|') ? mapName.split('|')[1] : mapName;
                    if (mapName.includes('|')) {
                        options.shorthand = mapName.split('|')[0];
                    }
                    options.value = value;
                    options.type = 'argument';
                }
                else {
                    const mapName = this.getName(tokenDeclaration, index + 1);
                    options.name = mapName.includes('|') ? mapName.split('|')[1] : mapName;
                    if (mapName.includes('|')) {
                        options.shorthand = mapName.split('|')[0];
                    }
                    options.value = true;
                    options.type = 'option';
                }
                tokens.push(options);
            }
            else {
                const name = this.getName(token, index + 1);
                const options = {
                    type: 'argument',
                    value: token,
                };
                if (name.includes('|')) {
                    options.name = name.split('|')[1];
                    options.shorthand = name.split('|')[0];
                }
                else {
                    options.name = name;
                }
                tokens.push(options);
            }
        }
        return tokens;
    }
    getName(token, index) {
        const mapTokens = this.map.split(' ');
        const tokenName = mapTokens.find((mapToken) => mapToken.includes(token) || mapToken.includes(`{${token}}`));
        if (tokenName) {
            return tokenName.substring(2).replaceAll(/[={}]/g, '');
        }
        return (mapTokens[index].startsWith('--') ? mapTokens[index].substring(2) : mapTokens[index]).replaceAll(/[={}]/g, '');
    }
}
