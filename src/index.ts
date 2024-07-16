import * as dotenv from 'dotenv'
import CommandProcessor, { CommandExecutor } from './processor/command_processor.js'
import Command, { type ICommand } from './commands/command.js'
import { default as Tree, Node } from './tree/tree.js'
import { default as Context, type ExecutionState } from './processor/context.js'
import { default as Tokenizer, type Token } from './processor/tokenizer.js'

/**
 * The command processor instance which is used to execute commands passed to the application. This is where you also
 * register your commands by calling the `register` method on the processor instance.
 */
const processor = new CommandProcessor()

/**
 * The main function which is called when the application is invoked from the command line. Its responsibility is
 * to configure the environment, and then execute the command processor with the arguments passed to the application.
 * @param {string[]} argv The arguments passed to the application via the cli.
 */
async function main(argv: string[]): Promise<number> {
  dotenv.configDotenv()
  processor.execute(argv[2], argv.slice(2))
  return 0
}

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
  main as default,
  processor,
}
