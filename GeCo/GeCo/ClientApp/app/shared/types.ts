export interface ITrait {
    phenotype: string;
    genotype: string;
    type: string;
}

export interface IOrganism {
    trait1: ITrait;
    trait2: ITrait;
}

export interface IParents {
    parent1: IOrganism;
    parent2: IOrganism;
    percentage: number;
}

export interface IExamQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
    studentAnswer: string;
}