import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function clear(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  return {
    output: '\x1b[2J\x1b[H',
    exitCode: 0
  };
}
