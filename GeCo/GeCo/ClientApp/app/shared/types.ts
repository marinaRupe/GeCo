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
