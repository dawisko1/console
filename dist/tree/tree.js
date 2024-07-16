export default class Tree {
    nodes;
    controlOpenChar;
    controlCloseChar;
    controlParamChar;
    constructor(nodes = new Set(), controlOpenChar = '(', controlCloseChar = ')', controlParamChar = ',') {
        this.nodes = nodes;
        this.controlOpenChar = controlOpenChar;
        this.controlCloseChar = controlCloseChar;
        this.controlParamChar = controlParamChar;
    }
    push(node) {
        this.nodes.add(node);
    }
    trunk() {
        return Array.from(this.nodes.values())[0];
    }
    static fromString(str) {
        const tree = new Tree();
        let stack = [];
        let current = undefined;
        for (let char of str.split('')) {
            if (char === tree.controlOpenChar) {
                const node = new Node(stack.join(''));
                if (current) {
                    current.param(node);
                    node.parent = current;
                }
                current = node;
                stack = [];
            }
            else if (char === tree.controlParamChar && current) {
                current.param(stack.join(''));
                stack = [];
            }
            else if (char !== tree.controlCloseChar) {
                stack.push(char);
            }
            else {
                if (current && stack.length > 0) {
                    current.param(stack.join(''));
                    stack = [];
                }
            }
        }
        tree.nodes.add(current.root());
        return tree;
    }
}
export class Node {
    value;
    parent;
    args;
    constructor(value, parent, args = new Set()) {
        this.value = value;
        this.parent = parent;
        this.args = args;
    }
    set(value) {
        this.value = value;
    }
    param(param) {
        if (typeof param === 'string') {
            let _cleanParam = param.trim();
            _cleanParam = _cleanParam.startsWith("'")
                ? _cleanParam.substring(1, _cleanParam.length - 1)
                : _cleanParam;
            _cleanParam = _cleanParam.startsWith('"')
                ? _cleanParam.substring(1, _cleanParam.length - 1)
                : _cleanParam;
            this.args.add(_cleanParam);
        }
        else {
            this.args.add(param);
        }
    }
    root() {
        let current = this;
        while (current.parent) {
            // @ts-ignore
            current = current.parent;
        }
        return current;
    }
    first() {
        return Array.from(this.args.values())[0];
    }
}
