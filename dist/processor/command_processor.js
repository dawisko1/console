import Context from './context.js'

export default class CommandProcessor {
  commands = new Map()
  register(command) {
    this.commands.set(command.command.split(' ')[0], (argv) =>
      command.handle.call(this.buildContext(command, new Context(argv, command))),
    )
  }
  execute(command, argv) {
    const executor = this.commands.get(command.split(' ')[0])
    if (executor) {
      executor(argv)
    } else {
      console.error(`Command not found: ${command}`)
    }
  }
  buildContext(command, context) {
    const newContext = {}
    for (let entry of Object.getOwnPropertyNames(command)) {
      // @ts-ignore
      if (typeof command[entry] === 'function') {
        // @ts-ignore
        newContext[entry] = command[entry].bind(command)
      } else {
        // @ts-ignore
        newContext[entry] = command[entry]
      }
    }
    for (let entry of Object.getOwnPropertyNames(Object.getPrototypeOf(command))) {
      // @ts-ignore
      if (typeof command[entry] === 'function' && !entry.startsWith('_')) {
        // @ts-ignore
        newContext[entry] = command[entry].bind(command)
      }
    }
    for (let entry of Object.getOwnPropertyNames(context)) {
      // @ts-ignore
      if (typeof context[entry] === 'function') {
        // @ts-ignore
        newContext[entry] = context[entry].bind(context)
      } else {
        // @ts-ignore
        newContext[entry] = context[entry]
      }
    }
    for (let entry of Object.getOwnPropertyNames(Object.getPrototypeOf(context))) {
      // @ts-ignore
      if (typeof context[entry] === 'function' && !entry.startsWith('_')) {
        // @ts-ignore
        newContext[entry] = context[entry].bind(context)
      }
    }
    return newContext
  }
}
