import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function ls(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  try {
    const path = parsed.args[0] || '.';
    const flags = {
      l: parsed.flags.l || false,
      a: parsed.flags.a || false
    };
    
    const output = fs.ls(path, flags);
    
    return {
      output,
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
