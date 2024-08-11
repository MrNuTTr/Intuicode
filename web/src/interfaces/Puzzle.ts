export enum PuzzleDifficulty {
    trivial, easy, simple, manageable, challenging,
    tough, hard, complex, intense, extreme
}

export interface TestCase {
    timeoutSeconds: number;
    setupCode: string;
    testCode: string;
    hidden: boolean;
}

export interface PuzzleCode {
    startCode: string;
    testCases: TestCase[];
}

export interface PuzzleModel {
    id: string;
    name: string;
    category: string;
    difficulty: PuzzleDifficulty;
    description: string;
    sequenceNumber: number;
    code: { [key: string]: PuzzleCode };
    hints: string[];
    tags: string[];
}
