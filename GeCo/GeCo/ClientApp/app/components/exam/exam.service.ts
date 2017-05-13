import { Injectable } from '@angular/core';
import { ITrait, IExamQuestion, IParents, IChild, IGenotype } from "../../shared/types";
import { GeneticDataService } from '../../genetic-data.service';
import { InheritanceService } from '../../inheritance.service';

@Injectable()
export class ExamService {
    organisms = [];
    data;

    constructor(private geneticDataService: GeneticDataService, private inheritanceService: InheritanceService) {}

    generateExam(numberOfQuestions: number) {
        return new Promise((resolve, reject) => {
            this.geneticDataService.getData()
                .then((result) => {
                    this.data = result;

                    this.geneticDataService.getOrganisms().then((result) => {
                        this.organisms = <any>result;

                        let questionTypes = [
                            this.getQuestionType1.bind(this),
                            this.getQuestionType2.bind(this),
                            this.getQuestionType3.bind(this),
                            this.getQuestionType4.bind(this),
                            this.getQuestionType5.bind(this),
                            this.getQuestionType6.bind(this),
                            this.getQuestionType7.bind(this)
                        ];
                        let questions = [];
                        for (let i = 0; i < numberOfQuestions; i++) {
                            //TODO: choose randomly
                            let question = questionTypes[Math.floor(Math.random() * questionTypes.length)]();
                            this.shuffleAnswers(question.answers);
                            questions.push(question);
                        }
                        resolve(questions);
                    }
                    );
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
        //TODO: data types will change when REST is done
        const organisms = this.organisms;
        let organism = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType === 'spolni kromosomi' || char.inheritanceType === 'vezani geni') {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const child = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type;
        const PARENT2_TYPE = parent2.type;
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;
        const CHILD_TRAIT = child.phenotype;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
                i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
                koliko će djece (od njih 4) nastalo križanjem ova dva roditelja imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT}?
                Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${organism} je: ${INHERITANCE_TYPE}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(CHARACTERISTIC,
            { type1: INHERITANCE_TYPE, type2: "" },
            char.traits,
            [],
            { trait1: parent1, trait2: {} as any },
            { trait1: parent2, trait2: {} as any });

        let counter = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.phenotype === CHILD_TRAIT) {
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
        //TODO: data types will change when REST is done
        const organisms = this.organisms;

        let organism = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType === 'spolni kromosomi' || char.inheritanceType === 'vezani geni') {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const child = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type;
        const PARENT2_TYPE = parent2.type;
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;
        const CHILD_TRAIT = child.phenotype;

        let q : IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
                i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
                koliki će postotak djece nastalih križanjem ova dva roditelja imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT}?
                Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${organism} je: ${INHERITANCE_TYPE}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(CHARACTERISTIC,
            { type1: INHERITANCE_TYPE, type2: "" },
            char.traits,
            [],
            { trait1: parent1, trait2: {} as any },
            { trait1: parent2, trait2: {} as any });

        let counter = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.phenotype === CHILD_TRAIT) {
                counter++;
            }
        }

        q.answers = ["0%", "25%", "50%", "75%", "100%"];
        q.correctAnswer = ((counter / children.length) * 100).toString() + "%";
        return q;
    }

    getQuestionType3() : IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = this.organisms;

        let organism = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType === 'spolni kromosomi' || char.inheritanceType === 'vezani geni') {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const child = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type;
        const PARENT2_TYPE = parent2.type;
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;
        const CHILD_TYPE = child.type;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
        i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
        koliko će djece (od njih 4) nastalo križanjem ova dva roditelja biti ${CHILD_TYPE}?
        Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${organism} je: ${INHERITANCE_TYPE}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(CHARACTERISTIC,
            { type1: INHERITANCE_TYPE, type2: "" },
            char.traits,
            [],
            { trait1: parent1, trait2: {} as any },
            { trait1: parent2, trait2: {} as any });

        let typeCount: number = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.type === CHILD_TYPE) {
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
        //TODO: data types will change when REST is done
        const organisms = this.organisms;

        let organism = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType === 'spolni kromosomi' || char.inheritanceType === 'vezani geni') {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }
        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type;
        const PARENT2_TYPE = parent2.type;
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
        i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
        koliki je omjer broja homozigotne djece naspram broja heterozigotne djece nastalih križanjem ova dva roditelja? Pretpostavljamo da je ukupan broj djece 4.
        Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${organism} je: ${INHERITANCE_TYPE}.`;

        let children: IChild[] = this.inheritanceService.generateChildren(CHARACTERISTIC,
            { type1: INHERITANCE_TYPE, type2: "" },
            char.traits,
            [],
            { trait1: parent1, trait2: {} as any },
            { trait1: parent2, trait2: {} as any });

        let homozygoteCount: number = 0;
        let heterozygoteCount: number = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].child.trait1.type === "homozigot") {
                homozygoteCount++;
            } else {
                heterozygoteCount++;
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
        //TODO: data types will change when REST is done
        const organisms = this.organisms;

        let organism = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType === 'spolni kromosomi' || char.inheritanceType === 'vezani geni') {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const child = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type;
        const PARENT2_TYPE = parent2.type;
        const PARENT1_GENOTYPE = parent1.genotype.allele1 + parent1.genotype.allele2;
        const PARENT2_GENOTYPE = parent2.genotype.allele1 + parent2.genotype.allele2;
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;
        const CHILD_GENOTYPE = child.genotype.allele1 + child.genotype.allele2;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${
            CHARACTERISTIC}-${PARENT1_TRAIT} (${PARENT1_GENOTYPE})
        i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT} (${PARENT2_GENOTYPE}),
        koliko će djece (od njih 4) nastalo križanjem ova dva roditelja biti ${CHILD_GENOTYPE}?
        Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${organism} je: ${INHERITANCE_TYPE}.`;

        let parents: IParents[] = this.inheritanceService.getParentsForChild(CHARACTERISTIC, { type1: char.inheritanceType, type2: "" }, char.traits, [], child.genotype, {} as IGenotype);
        for (let i = 0; i < parents.length; i++) {
            let parentPair: IParents = parents[i];
            if (parent1.genotype === parentPair.parent1.trait1.genotype && parent2.genotype === parentPair.parent2.trait1.genotype) {
                q.correctAnswer = (parentPair.percentage * 4).toString();
                break;
            }
        }
        q.answers = ["0", "1", "2", "3", "4"];
        return q;
    }

    getQuestionType6(): IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = this.organisms;

        let ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[ORGANISM];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType !== 'dominantno/recesivno' && char.inheritanceType !== 'nepotpuno dominantno/recesivno') {
            ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[ORGANISM];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const RECESIVE_TRAIT = char.traits[2].phenotype;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${ORGANISM} i svojstvo ${CHARACTERISTIC} obilježje ${RECESIVE_TRAIT} je recesivno.
        Za jedinku sa svojstom ${CHARACTERISTIC}-${RECESIVE_TRAIT} znamo da je jedan roditelj također svojstva ${CHARACTERISTIC}-${RECESIVE_TRAIT}.
        Koje od sljedećih svojstava NE može imati drugi roditelj prema ${INHERITANCE_TYPE} tipu nasljeđivanja?`;

        q.answers = [
            `${char.traits[0].phenotype} (${char.traits[0].type})`,
            `${char.traits[1].phenotype} (${char.traits[1].type})`,
            `${char.traits[2].phenotype} (${char.traits[2].type})`
        ];
        q.correctAnswer = `${char.traits[0].phenotype} (${char.traits[0].type})`;
        return q;
    }

    getQuestionType7(): IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = this.organisms;

        let organism = organisms[Math.floor(Math.random() * organisms.length)];
        let organismData = this.data[organism];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType === 'spolni kromosomi' || char.inheritanceType === 'vezani geni') {
            organism = organisms[Math.floor(Math.random() * organisms.length)];
            organismData = this.data[organism];
            char = organismData[Math.floor(Math.random() * organismData.length)];
        }

        const child = char.traits[Math.floor(Math.random() * char.traits.length)];
        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const RECESIVE_TRAIT = char.traits[2].phenotype;
        const CHILD_TRAIT = child.phenotype;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${organism} i svojstvo ${CHARACTERISTIC} obilježje ${RECESIVE_TRAIT} je recesivno.
        Ako imamo roditelja čije je svojstvo ${CHARACTERISTIC}-${RECESIVE_TRAIT} i roditelja čije je svojstvo ${CHARACTERISTIC}-${RECESIVE_TRAIT},
        može li njihovo dijete imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT} prema ${INHERITANCE_TYPE} tipu nasljeđivanja?`;

        q.answers = ["DA", "NE"];
        q.correctAnswer = CHILD_TRAIT === RECESIVE_TRAIT ? "DA" : "NE";
        return q;
    }
}