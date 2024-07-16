export type Token = {
    name: string;
    shorthand?: string;
    type: 'argument' | 'option' | 'execution-string';
    value: string | boolean;
};
export default class Tokenizer {
    private readonly argv;
    private readonly map;
    constructor(argv: string[], map: string);
    tokenize(): Token[];
    private getName;
}
