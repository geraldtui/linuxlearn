import { VirtualFilesystem } from './filesystem';
import { ParsedCommand, ExecutionResult } from '@/types';
import { parseCommand } from '@/utils/commandParser';
import { commandRegistry } from './commands';

export function executeCommand(
  input: string,
  fs: VirtualFilesystem
): ExecutionResult {
  const parsed = parseCommand(input);
  
  if (!parsed.command) {
    return {
      output: '',
      exitCode: 0
    };
  }

  const handler = commandRegistry[parsed.command];
  
  if (!handler) {
    return {
      output: '',
      error: `bash: ${parsed.command}: command not found`,
      exitCode: 127
    };
  }

  try {
    return handler(parsed, fs);
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error',
      exitCode: 1
    };
  }
}
