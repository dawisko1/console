import Tokenizer from './tokenizer.js'

export default class Context {
  argv
  _command
  context = {
    options: [],
    arguments: {},
  }
  constructor(argv, _command) {
    this.argv = argv
    this._command = _command
    this.parse(argv, _command)
  }
  option(name) {
    return this.context.options.includes(name)
  }
  argument(name) {
    return this.context.arguments[name]
  }
  parse(argv, command) {
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
