import Command from '../commands/command.js'

export type ExecutionState = {
  options: string[]
  arguments: {
    [key: string]: string | boolean
  }
}
export default class Context {
  private readonly argv
  private readonly _command
  private context
  constructor(argv: string[], _command: Command)
  option(name: string): boolean
  argument(name: string): string | boolean
  private parse
}
