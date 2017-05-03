import { Component, OnInit } from '@angular/core';
import { GeneticDataService } from '../../genetic-data.service';

@Component({
    selector: 'exam',
    template: require('./exam.component.html'),
    providers: [GeneticDataService]
})
export class ExamComponent {
    private testStarted: boolean;
    private showResults: boolean;
    private questions;
    private correctAnswers: number;
    private numberOfQuestions: number;

    constructor(private geneticDataService: GeneticDataService) { }

    ngOnInit() {
        this.testStarted = false;
        this.showResults = false;
        this.correctAnswers = 0;
        this.numberOfQuestions = 5;
    }

    start() {
        this.showResults = false;
        this.testStarted = true;
        this.generateExam();
    }

    stop() {
        this.showResults = false;
        this.testStarted = false;
    }

    grade() {
        this.correctAnswers = 0;
        for (let i = 0; i < this.questions.length; i++) {
            let q = this.questions[i];
            if (q.studentAnswer === q.correctAnswer) this.correctAnswers++;
        }
        this.showResults = true;
    }

    onAnswerSelect(questionId, answer) {
        this.questions[questionId].studentAnswer = answer;
    }

    generateExam() {
        const numberOfQuestions = 5;
        this.questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            //TODO: choose randomly
            this.questions.push(this.getQuestionType1());
        }
    }

    getQuestionType1() {
        //TODO: data types will change when REST is done
        const organisms = this.geneticDataService.getOrganisms();
        const ORGANISM = organisms[Math.floor(Math.random() * organisms.length)];
        const organismData = this.geneticDataService.getData()[ORGANISM];
        const char = organismData[Math.floor(Math.random() * organismData.length)];
        const parent1 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const parent2 = char.traits[Math.floor(Math.random() * char.traits.length)];
        const child = char.traits[Math.floor(Math.random() * char.traits.length)];

        const CHARACTERISTIC = char.characteristic;
        const INHERITANCE_TYPE = char.inheritanceType;
        const PARENT1_TYPE = parent1.type.toLowerCase();
        const PARENT2_TYPE = parent2.type.toLowerCase();
        const PARENT1_TRAIT = parent1.phenotype;
        const PARENT2_TRAIT = parent2.phenotype;
        const CHILD_TRAIT = child.phenotype;

        let q = {question : "", answers : [], correctAnswer : "", studentAnswer: ""};
        q.question = `Za organizam ${ORGANISM}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
                i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
                koliko će djece (od njih 4) nastalo križanjem ova dva roditelja imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT}?
                Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${ORGANISM} je: ${INHERITANCE_TYPE}.`;

        q.answers = ["0", "1", "2", "3", "4"];
        q.correctAnswer = "2";
        return q;
    }
}