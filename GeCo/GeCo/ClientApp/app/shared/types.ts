export interface ITrait {
    phenotype: string;
    genotype: IGenotype;
    type: string;
    imageUrl: string;
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

export interface IChild {
    child: IOrganism;
    percentage: number;
}

export interface IExamQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
    studentAnswer: string;
}

export interface ILinkedGenes {
    gene1Name: string;
    gene2Name: string;
    cM: number;
}

export interface IGenotype {
    allele1: string;
    allele2: string;
}