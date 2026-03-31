import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';

export function echo(
  parsed: ParsedCommand,
  fs: VirtualFilesystem
): ExecutionResult {
  try {
    const text = parsed.args.join(' ');
    
    if (parsed.redirect) {
      const append = parsed.redirect.type === '>>';
      fs.writeFile(parsed.redirect.target, text + '\n', append);
      
      return {
        output: '',
        exitCode: 0
      };
    }
    
    return {
      output: text,
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
