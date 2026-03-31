import { VirtualFilesystem } from '@/engine/filesystem';
import { executeCommand } from '@/engine/commandExecutor';
import { StepData, ValidationResult } from '@/types';
import { normalizeCommand } from './commandParser';

export function checkCommand(
  userCommand: string,
  stepData: StepData,
  filesystem: VirtualFilesystem
): ValidationResult {
  const result = executeCommand(userCommand, filesystem);

  const normalizedUserCmd = normalizeCommand(userCommand);
  const commandMatch = stepData.expectedCommand.some(cmd =>
    normalizeCommand(cmd) === normalizedUserCmd
  );

  const outputMatch = stepData.expectedOutput
    ? result.output.trim() === stepData.expectedOutput.trim()
    : true;

  const customMatch = stepData.customValidate
    ? stepData.customValidate(userCommand, result.output, filesystem)
    : true;

  const isSuccess = commandMatch && outputMatch && customMatch;
  const displayOutput = result.error || result.output;

  return {
    isSuccess,
    output: displayOutput,
    error: isSuccess ? undefined : (result.error || stepData.hint || 'Command did not match expected result')
  };
}
