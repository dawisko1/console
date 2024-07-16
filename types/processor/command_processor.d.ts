import Command from '#commands/command'

export type CommandExecutor = (argv: string[]) => void
export default class CommandProcessor {
  private commands
  register(command: Command): void
  execute(command: string, argv: string[]): void
  private buildContext
}
