import Command from '../commands/command.js'
import Tokenizer from './tokenizer.js'

export type ExecutionState = {
  options: string[]
  arguments: {
    [key: string]: string | boolean
  }
}

export default class Context {
  private context: ExecutionState = {
    options: [],
    arguments: {},
  }

  constructor(
    private readonly argv: string[],
    private readonly _command: Command,
  ) {
    this.parse(argv, _command)
  }

  public option(name: string) {
    return this.context.options.includes(name)
  }

  public argument(name: string) {
    return this.context.arguments[name]
  }

  private parse(argv: string[], command: Command) {
    const tokenizer = new Tokenizer(argv, command.command)
    const tokens = tokenizer.tokenize()

    for (const token of tokens) {
      if (token.type === 'option') {
        this.context.options.push(token.name)
      } else {
        this.context.arguments[token.name] = token.value
      }
    }
  }
}
