import { VirtualFilesystem } from '../filesystem';
import { ExecutionResult, ParsedCommand } from '@/types';
import { pwd } from './pwd';
import { ls } from './ls';
import { cd } from './cd';
import { mkdir } from './mkdir';
import { touch } from './touch';
import { cat } from './cat';
import { echo } from './echo';
import { rm } from './rm';
import { clear } from './clear';

export type CommandHandler = (
  parsed: ParsedCommand,
  fs: VirtualFilesystem
) => ExecutionResult;

export const commandRegistry: Record<string, CommandHandler> = {
  pwd,
  ls,
  cd,
  mkdir,
  touch,
  cat,
  echo,
  rm,
  clear
};

export { pwd, ls, cd, mkdir, touch, cat, echo, rm, clear };
