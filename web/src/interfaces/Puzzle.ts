export interface PuzzleCode {
    timeoutSeconds: number;
    startCode: string;
    assertCode: string;
}

export interface PuzzleModel {
    id: string;
    name: string;
    category: string;
    description: string;
    sequenceNumber: number;
    code: { [key: string]: PuzzleCode };
    hints: string[];
    tags: string[];
}
