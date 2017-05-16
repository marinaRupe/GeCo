import { Injectable } from '@angular/core';
import { GeneticDataService } from '../../genetic-data.service';
import { InheritanceService } from '../../inheritance.service';
import { ITrait, IExamQuestion, IParents, IChild, IGenotype } from "../../shared/types";
import {
    DOMINANT_RECESSIVE_INHERITANCE, INCOMPLETE_DOMINANCE_INHERITANCE, CODOMINANT_INHERITANCE, MALE_SEX_CHROMOSOME,
    SEX_CHROMOSOMES_INHERITANCE, LINKED_GENES_INHERITANCE, HETEROZYGOTE, RECESSIVE_HOMOZYGOTE, DOMINANT_HOMOZYGOTE
} from '../../shared/constants';

@Injectable()
export class ExamService {
    organisms = [];
    data = {};
    linkedGenesAll = {};

    constructor(private geneticDataService: GeneticDataService, private inheritanceService: InheritanceService) {}

    generateExam(numberOfQuestions: number) {
        return new Promise((resolve, reject) => {
            this.geneticDataService.getOrganisms()
                .then((result) => {
                    this.organisms = (<any>result).map(o => o.name);
                    
                    this.geneticDataService.getAllData().then((result) => {
                        this.data = result;

                            this.geneticDataService.getLinkedGenesAll()
                                .then((result) => {
                                    this.linkedGenesAll = result;

                                    let questionTypes = [
                                        this.getQuestionType1.bind(this),
                                        this.getQuestionType2.bind(this),
                                        this.getQuestionType3.bind(this),
                                        this.getQuestionType4.bind(this),
                                        this.getQuestionType5.bind(this),
                                        this.getQuestionType6.bind(this),
                                        this.getQuestionType7.bind(this),
                                        this.getQuestionType8.bind(this)
                                    ];
                                    let questions = [];
                                    for (let i = 0; i < numberOfQuestions; i++) {
                                        let question = questionTypes[Math.floor(Math.random() * questionTypes.length)]();
                                        this.shuffleAnswers(question.answers);
                                        questions.push(question);
                                    }
                                    resolve(questions);
                                });
                        });
                });
        });  
    }

    shuffleAnswers(answerList) {
        for (let i = answerList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [answerList[i - 1], answerList[j]] = [answerList[j], answerList[i - 1]];
    }
}

    getQuestionType1() : IExamQuestion {
        const organisms = this.organisms;
        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType === SEX_CHROMOSOMES_INHERITANCE || char.inheritanceType === LINKED_GENES_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const characteristic: string = char.characteristic;
        const inheritanceType: string = char.inheritanceType;
        const parent1Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const childTrait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${parent1Trait.type} i čije je svojstvo ${characteristic}-${parent1Trait.phenotype}
                i roditelja koji je ${parent2Trait.type} i čije je svojstvo ${characteristic}-${parent2Trait.phenotype},
                koliko će djece (od njih 4) nastalo križanjem ova dva roditelja imati svojstvo ${characteristic}-${childTrait.phenotype}?
                Tip nasljeđivanja za svojstvo ${characteristic} kod organizma ${organism} je: ${inheritanceType}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(
            { first: characteristic, second: "" },
            { type1: inheritanceType, type2: "" },
            char.traits,
            [],
            { trait1: parent1Trait, trait2: {} as any },
            { trait1: parent2Trait, trait2: {} as any },
        );

        let counter = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.phenotype === childTrait.phenotype) {
                counter++;
            }
        }
        if (children.length < 4) {
            counter *= 4 / children.length;
        }

        q.answers = ["0", "1", "2", "3", "4"];
        q.correctAnswer = counter.toString();
        return q;
    }

    getQuestionType2() : IExamQuestion {
        const organisms = this.organisms;

        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType === SEX_CHROMOSOMES_INHERITANCE || char.inheritanceType === LINKED_GENES_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const characteristic: string = char.characteristic;
        const inheritanceType: string = char.inheritanceType;
        const parent1Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const childTrait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];

        let q : IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${parent1Trait.type} i čije je svojstvo ${characteristic}-${parent1Trait.phenotype}
                i roditelja koji je ${parent2Trait.type} i čije je svojstvo ${characteristic}-${parent2Trait.phenotype},
                koliki će postotak djece nastalih križanjem ova dva roditelja imati svojstvo ${characteristic}-${childTrait.phenotype}?
                Tip nasljeđivanja za svojstvo ${characteristic} kod organizma ${organism} je: ${inheritanceType}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(
            { first: characteristic, second: "" },
            { type1: inheritanceType, type2: "" },
            char.traits,
            [],
            { trait1: parent1Trait, trait2: {} as any },
            { trait1: parent2Trait, trait2: {} as any }
        );

        let counter = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.phenotype === childTrait.phenotype) {
                counter++;
            }
        }

        q.answers = ["0%", "25%", "50%", "75%", "100%"];
        q.correctAnswer = ((counter / children.length) * 100).toString() + "%";
        return q;
    }

    getQuestionType3() : IExamQuestion {
        const organisms = this.organisms;

        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType === SEX_CHROMOSOMES_INHERITANCE || char.inheritanceType === LINKED_GENES_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const characteristic: string = char.characteristic;
        const inheritanceType: string = char.inheritanceType;
        const parent1Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const childTrait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${parent1Trait.type} i čije je svojstvo ${characteristic}-${parent1Trait.phenotype}
        i roditelja koji je ${parent2Trait.type} i čije je svojstvo ${characteristic}-${parent2Trait.phenotype},
        koliko će djece (od njih 4) nastalo križanjem ova dva roditelja biti ${childTrait.type}?
        Tip nasljeđivanja za svojstvo ${characteristic} kod organizma ${organism} je: ${inheritanceType}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(
            { first: characteristic, second: "" },
            { type1: inheritanceType, type2: "" },
            char.traits,
            [],
            { trait1: parent1Trait, trait2: {} as any },
            { trait1: parent2Trait, trait2: {} as any }
        );

        let typeCount: number = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.type === childTrait.type) {
                typeCount++;
            }
        }
        if (children.length < 4) {
            typeCount *= 4 / children.length;
        }

        q.answers = ["0", "1", "2", "3", "4"];
        q.correctAnswer = typeCount.toString();
        return q;
    }

    getQuestionType4(): IExamQuestion {
        const organisms = this.organisms;

        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType === SEX_CHROMOSOMES_INHERITANCE || char.inheritanceType === LINKED_GENES_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const characteristic: string = char.characteristic;
        const inheritanceType: string = char.inheritanceType;
        const parent1Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${parent1Trait.type} i čije je svojstvo ${characteristic}-${parent1Trait.phenotype}
        i roditelja koji je ${parent2Trait.type} i čije je svojstvo ${characteristic}-${parent2Trait.phenotype},
        koliki je omjer broja homozigotne djece naspram broja heterozigotne djece nastalih križanjem ova dva roditelja? Pretpostavljamo da je ukupan broj djece 4.
        Tip nasljeđivanja za svojstvo ${characteristic} kod organizma ${organism} je: ${inheritanceType}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(
            { first: characteristic, second: "" },
            { type1: inheritanceType, type2: "" },
            char.traits,
            [],
            { trait1: parent1Trait, trait2: {} as any },
            { trait1: parent2Trait, trait2: {} as any }
        );

        let homozygoteCount: number = 0;
        let heterozygoteCount: number = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.type === HETEROZYGOTE) {
                heterozygoteCount++;
            }
            else {
                homozygoteCount++;
            }
        }
        if (children.length < 4) {
            homozygoteCount *= 4 / children.length;
            heterozygoteCount *= 4 / children.length;
        }

        q.answers = ["0:4", "1:3", "2:2", "3:1", "4:0"];
        q.correctAnswer = homozygoteCount.toString() + ":" + heterozygoteCount.toString();
        return q;
    }

    getQuestionType5(): IExamQuestion {
        const organisms = this.organisms;

        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType === SEX_CHROMOSOMES_INHERITANCE || char.inheritanceType === LINKED_GENES_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }
        const characteristic: string = char.characteristic;
        const inheritanceType: string = char.inheritanceType;
        const parent1Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2Trait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];
        const childTrait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];

        const parent1Genotype: string = parent1Trait.genotype.allele1 + parent1Trait.genotype.allele2;
        const parent2Genotype: string = parent2Trait.genotype.allele1 + parent2Trait.genotype.allele2;
        const childGenotype: string = childTrait.genotype.allele1 + childTrait.genotype.allele2;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${parent1Trait.type} i čije je svojstvo ${
            characteristic}-${parent1Trait.phenotype} (${parent1Genotype})
        i roditelja koji je ${parent2Trait.type} i čije je svojstvo ${characteristic}-${parent2Trait.phenotype} (${parent2Genotype}),
        koliko će djece (od njih 4) nastalo križanjem ova dva roditelja biti ${childGenotype}?
        Tip nasljeđivanja za svojstvo ${characteristic} kod organizma ${organism} je: ${inheritanceType}.`;

        /*
        let parents: IParents[] = this.inheritanceService.getParentsForChild(
            { first: characteristic, second: "" },
            { type1: char.inheritanceType, type2: "" },
            char.traits, [], childTrait.genotype, {} as IGenotype
        );
        for (let i = 0; i < parents.length; i++) {
            let parentPair: IParents = parents[i];
            if (parent1Trait.genotype.allele1 === parentPair.parent1.trait1.genotype.allele1 && parent2Trait.genotype.allele1 === parentPair.parent2.trait1.genotype.allele1
                && parent1Trait.genotype.allele2 === parentPair.parent1.trait1.genotype.allele2 && parent2Trait.genotype.allele2 === parentPair.parent2.trait1.genotype.allele2) {
                q.correctAnswer = (parentPair.percentage * 4).toString();
                break;
            }
        }
        */
        let children: IChild[] = this.inheritanceService.generateChildren(
            { first: characteristic, second: "" },
            { type1: char.inheritanceType, type2: "" },
            char.traits, [],
            { trait1: parent1Trait, trait2: {} as any },
            { trait1: parent2Trait, trait2: {} as any }
        );

        q.correctAnswer = "0";
        for (let i = 0; i < children.length; i++) {
            let child = children[i].child;
            let count = children[i].percentage * 4;

            if ((child.trait1.genotype.allele1 + child.trait1.genotype.allele2) === childGenotype
                || (child.trait1.genotype.allele2 + child.trait1.genotype.allele1) === childGenotype) {
                q.correctAnswer = count.toString();
                break;
            }
        }

        q.answers = ["0", "1", "2", "3", "4"];
        return q;
    }

    getQuestionType6(): IExamQuestion {
        const organisms = this.organisms;

        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType !== DOMINANT_RECESSIVE_INHERITANCE && char.inheritanceType !== INCOMPLETE_DOMINANCE_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const characteristic: string = char.characteristic;
        const inheritanceType: string = char.inheritanceType;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.answers = [];

        let recessiveTrait: ITrait;
        let dominantTrait: ITrait;
        for (let i = 0; i < char.traits.length; i++){
            q.answers.push(`${char.traits[i].phenotype} (${char.traits[i].type})`);

            if (char.traits[i].type === RECESSIVE_HOMOZYGOTE) {
                recessiveTrait = char.traits[i];
            }
            else if (char.traits[i].type === DOMINANT_HOMOZYGOTE) {
                dominantTrait = char.traits[i];
            }
        }

        q.question = `Za organizam ${organism} i svojstvo ${characteristic} obilježje ${recessiveTrait.phenotype} je recesivno.
        Za jedinku sa svojstom ${characteristic}-${recessiveTrait.phenotype} znamo da je jedan roditelj također svojstva ${characteristic}-${recessiveTrait.phenotype}.
        Koje od sljedećih svojstava NE može imati drugi roditelj prema ${inheritanceType} tipu nasljeđivanja?`;

        q.correctAnswer = `${dominantTrait.phenotype} (${dominantTrait.type})`;
        return q;
    }

    getQuestionType7(): IExamQuestion {
        const organisms = this.organisms;

        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType === CODOMINANT_INHERITANCE || char.inheritanceType === SEX_CHROMOSOMES_INHERITANCE || char.inheritanceType === LINKED_GENES_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const characteristic: string = char.characteristic;
        const inheritanceType: string = char.inheritanceType;
        const childTrait: ITrait = char.traits[Math.floor(Math.random() * char.traits.length)];

        let recessiveTrait: ITrait;
        for (let i = 0; i < char.traits.length; i++) {
            if (char.traits[i].type === RECESSIVE_HOMOZYGOTE) {
                recessiveTrait = char.traits[i];
                break;
            }
        }

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism} i svojstvo ${characteristic} obilježje ${recessiveTrait.phenotype} je recesivno.
        Ako imamo roditelja čije je svojstvo ${characteristic}-${recessiveTrait.phenotype} i roditelja čije je svojstvo ${characteristic}-${recessiveTrait.phenotype},
        može li njihovo dijete imati svojstvo ${characteristic}-${childTrait.phenotype} prema ${inheritanceType} tipu nasljeđivanja?`;

        q.answers = ["DA", "NE"];
        q.correctAnswer = childTrait.phenotype === recessiveTrait.phenotype ? "DA" : "NE";
        return q;
    }

    getQuestionType8(): IExamQuestion {
        const organisms = this.organisms;

        let organism: string = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];
        while (char.inheritanceType !== SEX_CHROMOSOMES_INHERITANCE) {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const characteristic: string = char.characteristic;
        let femaleRecessiveTrait: ITrait;
        for (let i = 0; i < char.traits.length; i++) {
            if (char.traits[i].type === RECESSIVE_HOMOZYGOTE && char.traits[i].genotype.allele2 !== MALE_SEX_CHROMOSOME) {
                femaleRecessiveTrait = char.traits[i];
                break;
            }
        }
        const femaleRecessiveGenotype: string = femaleRecessiveTrait.genotype.allele1 + femaleRecessiveTrait.genotype.allele2;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako majka ima svojstvo ${characteristic} (genotip ${femaleRecessiveGenotype}),
        koliki postotak muške djece će imati svojstvo ${characteristic}? Riječ je o nasljeđivanju putem spolnih kromosoma.`;

        q.answers = ["0%", "25%", "50%", "75%", "100%"];
        q.correctAnswer = "100%";
        return q;
    }
}