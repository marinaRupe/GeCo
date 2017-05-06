export interface ITrait {
    phenotype: string;
    genotype: string;
    type: string;
}

export interface IExamQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
    studentAnswer: string;
}

export enum RecombinationStartOrganism {
    Child = 0,
    Parents = 1
}