import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function cd(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  const path = parsed.args[0] || '~';
  const result = fs.cd(path);
  
  if (result.success) {
    return {
      output: '',
      exitCode: 0
    };
  } else {
    return {
      output: '',
      error: result.error,
      exitCode: 1
    };
  }
}
