export default class Tree {
    private nodes;
    private readonly controlOpenChar;
    private readonly controlCloseChar;
    private readonly controlParamChar;
    constructor(nodes?: Set<Node>, controlOpenChar?: string, controlCloseChar?: string, controlParamChar?: string);
    push(node: Node): void;
    trunk(): Node;
    static fromString(str: string): Tree;
}
export declare class Node {
    value: string;
    parent?: Node | undefined;
    args: Set<any>;
    constructor(value: string, parent?: Node | undefined, args?: Set<any>);
    set(value: string): void;
    param(param: any): void;
    root(): Node;
    first(): any;
}
