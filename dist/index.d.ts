import CommandProcessor, { CommandExecutor } from './processor/command_processor.js'
import Command, { type ICommand } from './commands/command.js'
import { default as Tree, Node } from './tree/tree.js'
import { default as Context, type ExecutionState } from './processor/context.js'
import { default as Tokenizer, type Token } from './processor/tokenizer.js'

/**
 * The command processor instance which is used to execute commands passed to the application. This is where you also
 * register your commands by calling the `register` method on the processor instance.
 */
declare const processor: CommandProcessor
/**
 * The main function which is called when the application is invoked from the command line. Its responsibility is
 * to configure the environment, and then execute the command processor with the arguments passed to the application.
 * @param {string[]} argv The arguments passed to the application via the cli.
 */
declare function main(argv: string[]): Promise<number>
/**
 * The function used to invoke the console application, simply call this at the top of your main script to handle
 * the execution flow.
 */
declare function invoke(): Promise<void>
export {
  Command,
  CommandProcessor,
  CommandExecutor,
  Tree,
  Node,
  Context,
  Tokenizer,
  type ExecutionState,
  type Token,
  type ICommand,
  invoke as default,
  main,
  processor,
}
