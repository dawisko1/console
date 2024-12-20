import Command from '../commands/command.js'
import Context from './context.js'

export type CommandExecutor = (argv: string[]) => void

export default class CommandProcessor {
  private commands: Map<string, CommandExecutor> = new Map()

  public register(command: Command) {
    this.commands.set(command.command.split(' ')[0], (argv: string[]) =>
      command.handle.call(this.buildContext(command, new Context(argv, command))),
    )
  }

  public execute(command: string, argv: string[]) {
    const executor = this.commands.get(command.split(' ')[0])

    if (executor) {
      executor(argv)
    } else {
      console.error(`Command not found: ${command}`)
    }
  }

  private buildContext(command: Command, context: Context) {
    const newContext: { [key: string]: any } = {}

    for (let entry of Object.getOwnPropertyNames(command)) {
      // @ts-expect-error
      if (typeof command[entry] === 'function') {
        // @ts-expect-error
        newContext[entry] = command[entry].bind(command)
      } else {
        // @ts-expect-error
        newContext[entry] = command[entry]
      }
    }

    for (let entry of Object.getOwnPropertyNames(Object.getPrototypeOf(command))) {
      // @ts-expect-error
      if (typeof command[entry] === 'function' && !entry.startsWith('_')) {
        // @ts-expect-error
        newContext[entry] = command[entry].bind(command)
      }
    }

    for (let entry of Object.getOwnPropertyNames(context)) {
      // @ts-expect-error
      if (typeof context[entry] === 'function') {
        // @ts-expect-error
        newContext[entry] = context[entry].bind(context)
      } else {
        // @ts-expect-error
        newContext[entry] = context[entry]
      }
    }

    for (let entry of Object.getOwnPropertyNames(Object.getPrototypeOf(context))) {
      // @ts-expect-error
      if (typeof context[entry] === 'function' && !entry.startsWith('_')) {
        // @ts-expect-error
        newContext[entry] = context[entry].bind(context)
      }
    }

    return newContext
  }
}
