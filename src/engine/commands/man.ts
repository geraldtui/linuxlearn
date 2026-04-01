import { ExecutionResult, ParsedCommand } from '@/types';
import { manPages } from '@/data/manPages';

export function man(parsed: ParsedCommand): ExecutionResult {
  const commandName = parsed.args[0];

  if (!commandName) {
    return {
      output: '',
      error: 'What manual page do you want?',
      exitCode: 1
    };
  }

  const manPage = manPages[commandName];

  if (!manPage) {
    return {
      output: '',
      error: `No manual entry for ${commandName}`,
      exitCode: 1
    };
  }

  return {
    output: manPage,
    exitCode: 0
  };
}
