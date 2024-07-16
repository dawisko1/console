import Context from '../processor/context.js'

/**
 * The interface which all commands must implement in order to be executed by the command processor.
 */
export interface ICommand extends Context {}
/**
 * The base class for all commands which are executed by the command processor.
 * You must override the `handle` method in order to implement the command logic. Additionally you can override the
 * `help` method to provide a help message for the command.
 */
export default class Command implements Pick<ICommand, 'option' | 'argument'> {
  command: string
  help(): string
  handle(): void
  argument: ICommand['argument']
  option: ICommand['option']
}
