import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function rm(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  try {
    if (parsed.args.length === 0) {
      return {
        output: '',
        error: 'rm: missing operand',
        exitCode: 1
      };
    }

    const path = parsed.args[0];
    const recursive = parsed.flags.r || false;
    const force = parsed.flags.f || false;
    
    fs.rm(path, recursive, force);
    
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
