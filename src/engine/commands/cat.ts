import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function cat(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  try {
    if (parsed.args.length === 0) {
      return {
        output: '',
        error: 'cat: missing file operand',
        exitCode: 1
      };
    }

    const path = parsed.args[0];
    const content = fs.cat(path);
    
    return {
      output: content,
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
