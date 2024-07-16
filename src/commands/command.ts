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
  public command: string = ''

  public help() {
    return 'No help available for this command'
  }

  public handle() {
    throw new Error('Method not implemented.')
  }

  declare argument: ICommand['argument']
  declare option: ICommand['option']
}
