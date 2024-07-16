
export default class Tree {
  constructor(
    private nodes: Set<Node> = new Set(),
    private readonly controlOpenChar = '(',
    private readonly controlCloseChar = ')',
    private readonly controlParamChar = ','
  ) {}

  push(node: Node) {
    this.nodes.add(node)
  }

  trunk() {
    return Array.from(this.nodes.values())[0]
  }

  public static fromString(str: string) {
    const tree = new Tree()

    let stack: string[] = []
    let current: Node | undefined = undefined

    for (let char of str.split('')) {
      if (char === tree.controlOpenChar) {
        const node = new Node(stack.join(''))

        if (current) {
          current.param(node)
          node.parent = current
        }

        current = node
        stack = []
      } else if (char === tree.controlParamChar && current) {
        current.param(stack.join(''))
        stack = []
      } else if (char !== tree.controlCloseChar) {
        stack.push(char)
      } else {
        if (current && stack.length > 0) {
          current.param(stack.join(''))
          stack = []
        }
      }
    }

    tree.nodes.add(current!.root())
    return tree
  }
}

export class Node {
  constructor(
    public value: string,
    public parent?: Node,
    public args: Set<any> = new Set()
  ) {}

  set(value: string) {
    this.value = value
  }

  param(param: any) {
    if (typeof param === 'string') {
      let _cleanParam = param.trim()

      _cleanParam = _cleanParam.startsWith("'")
        ? _cleanParam.substring(1, _cleanParam.length - 1)
        : _cleanParam

      _cleanParam = _cleanParam.startsWith('"')
        ? _cleanParam.substring(1, _cleanParam.length - 1)
        : _cleanParam

      this.args.add(_cleanParam)
    } else {
      this.args.add(param)
    }
  }

  root(): Node {
    let current = this

    while (current.parent) {
      // @ts-ignore
      current = current.parent
    }

    return current
  }

  first() {
    return Array.from(this.args.values())[0]
  }
}