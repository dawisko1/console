/**
 * The base class for all commands which are executed by the command processor.
 * You must override the `handle` method in order to implement the command logic. Additionally you can override the
 * `help` method to provide a help message for the command.
 */
export default class Command {
    command = '';
    help() {
        return 'No help available for this command';
    }
    handle() {
        throw new Error('Method not implemented.');
    }
}
