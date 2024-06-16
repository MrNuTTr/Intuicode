export interface CodeResult {
    success: boolean;
    reason: 'success' | 'error' | 'timeout' | 'assert-failed';
    helpMessage: string;
    stdout: string;
    stderr: string;
}
