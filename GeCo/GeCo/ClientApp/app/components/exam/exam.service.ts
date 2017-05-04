import { Injectable } from '@angular/core';
import { ITrait, IExamQuestion } from "../../shared/types";
import { GeneticDataService } from '../../genetic-data.service';
import { InheritanceService } from '../../inheritance.service';

@Injectable()
export class ExamService {
    constructor(private geneticDataService: GeneticDataService, private inheritanceService: InheritanceService) { }

    generateExam(numberOfQuestions: number): IExamQuestion[] {
        let questionTypes = [
            this.getQuestionType1,
            this.getQuestionType2,
            this.getQuestionType3,
            this.getQuestionType4,
            this.getQuestionType5,
            this.getQuestionType6,
            this.getQuestionType7
        ];
        let questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            //TODO: choose randomly
            let question = questionTypes[Math.floor(Math.random() * questionTypes.length)](this.geneticDataService, this.inheritanceService);
            this.shuffleAnswers(question.answers);
            questions.push(question);
        }
        return questions;
    }

    shuffleAnswers(answerList) {
        for (let i = answerList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [answerList[i - 1], answerList[j]] = [answerList[j], answerList[i - 1]];
    }
}

    getQuestionType1(geneticDataService: GeneticDataService, inheritanceService: InheritanceService) : IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = geneticDataService.getData()[ORGANISM];
        const char = organismData[Math.floor(Math.random() * organismData.length)];
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
        q.question = `Za organizam ${ORGANISM}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
                i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
                koliko će djece (od njih 4) nastalo križanjem ova dva roditelja imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT}?
                Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${ORGANISM} je: ${INHERITANCE_TYPE}.`;

        q.answers = ["0", "1", "2", "3", "4"];
        q.correctAnswer = "2";
        return q;
    }

    getQuestionType2(geneticDataService: GeneticDataService, inheritanceService: InheritanceService) : IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = geneticDataService.getData()[ORGANISM];
        const char = organismData[Math.floor(Math.random() * organismData.length)];
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
        q.question = `Za organizam ${ORGANISM}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
                i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
                koliki će postotak djece nastalih križanjem ova dva roditelja imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT}?
                Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${ORGANISM} je: ${INHERITANCE_TYPE}.`;

        q.answers = ["0%", "25%", "50%", "75%", "100%"];
        q.correctAnswer = "25%";
        return q;
    }

    getQuestionType3(geneticDataService: GeneticDataService, inheritanceService: InheritanceService) : IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = geneticDataService.getData()[ORGANISM];
        const char = organismData[Math.floor(Math.random() * organismData.length)];
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
        q.question = `Za organizam ${ORGANISM}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
        i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
        koliko će djece (od njih 4) nastalo križanjem ova dva roditelja biti ${CHILD_TYPE}?
        Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${ORGANISM} je: ${INHERITANCE_TYPE}.`;

        q.answers = ["0", "1", "2", "3", "4"];
        q.correctAnswer = "1";
        return q;
    }

    getQuestionType4(geneticDataService: GeneticDataService, inheritanceService: InheritanceService): IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = geneticDataService.getData()[ORGANISM];
        const char = organismData[Math.floor(Math.random() * organismData.length)];
        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type;
        const PARENT2_TYPE = parent2.type;
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${ORGANISM}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
        i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
        koliki je omjer broja homozigotne djece naspram broja hetrozigotne djece nastalih križanjem ova dva roditelja? Pretpostavljamo da je ukupan broj djece 4.
        Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${ORGANISM} je: ${INHERITANCE_TYPE}.`;

        q.answers = ["0:4", "1:3", "2:2", "3:1", "4:0"];
        q.correctAnswer = "1:3";
        return q;
    }

    getQuestionType5(geneticDataService: GeneticDataService, inheritanceService: InheritanceService): IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = geneticDataService.getData()[ORGANISM];
        const char = organismData[Math.floor(Math.random() * organismData.length)];
        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const child = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type;
        const PARENT2_TYPE = parent2.type;
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;
        const CHILD_GENOTYPE = child.genotype;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${ORGANISM}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${
            CHARACTERISTIC}-${PARENT1_TRAIT}
        i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
        koliko će djece (od njih 4) nastalo križanjem ova dva roditelja biti ${CHILD_GENOTYPE}?
        Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${ORGANISM} je: ${INHERITANCE_TYPE}.`;

        q.answers = ["0", "1", "2", "3", "4"];
        q.correctAnswer = "3";
        return q;
    }

    getQuestionType6(geneticDataService: GeneticDataService, inheritanceService: InheritanceService): IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = geneticDataService.getData()[ORGANISM];
        let char = organismData[Math.floor(Math.random() * organismData.length)];

        while (char.inheritanceType !== 'dominantno/recesivno' && char.inheritanceType !== 'nepotpuno dominantno/recesivno') {
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

    getQuestionType7(geneticDataService: GeneticDataService, inheritanceService: InheritanceService): IExamQuestion {
        //TODO: data types will change when REST is done
        const organisms = geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = geneticDataService.getData()[ORGANISM];
        const char = organismData[Math.floor(Math.random() * organismData.length)];
        const child = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const RECESIVE_TRAIT = char.traits[2].phenotype;
        const CHILD_TRAIT = child.phenotype;

        let q: IExamQuestion = { question: "", answers: [], correctAnswer: "", studentAnswer: "" };
        q.question = `Za organizam ${ORGANISM} i svojstvo ${CHARACTERISTIC} obilježje ${RECESIVE_TRAIT} je recesivno.
        Ako imamo roditelja čije je svojstvo ${CHARACTERISTIC}-${RECESIVE_TRAIT} i roditelja čije je svojstvo ${CHARACTERISTIC}-${RECESIVE_TRAIT},
        može li njihovo dijete imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT} prema ${INHERITANCE_TYPE} tipu nasljeđivanja?`;

        q.answers = ["DA", "NE"];
        q.correctAnswer = CHILD_TRAIT === RECESIVE_TRAIT ? "DA" : "NE";
        return q;
    }
}