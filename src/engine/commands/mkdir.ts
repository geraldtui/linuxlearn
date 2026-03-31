import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function mkdir(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  try {
    if (parsed.args.length === 0) {
      return {
        output: '',
        error: 'mkdir: missing operand',
        exitCode: 1
      };
    }

    const path = parsed.args[0];
    const recursive = parsed.flags.p || false;
    
    fs.mkdir(path, recursive);
    
    return {
      output: '',
      exitCode: 0
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error',
      exitCode: 1
    };
  }
}
