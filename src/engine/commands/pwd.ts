import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function pwd(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  return {
    output: fs.pwd(),
    exitCode: 0
  };
}
