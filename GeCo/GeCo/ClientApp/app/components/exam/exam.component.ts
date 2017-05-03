import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exam',
    template: require('./exam.component.html'),
})
export class ExamComponent {
    private testStarted: boolean;
    private questions;
    private studentAnswers: string[] = Array(10);
    constructor() { }

    ngOnInit() {
        this.testStarted = false;
    }

    start() {
        this.testStarted = true;
        this.generateExam();
    }

    stop() {
        this.testStarted = false;
    }

    grade() {
        //TODO: grading answers
    }

    generateExam() {
        const numberOfQuestions = 10;
        this.questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            //TODO: choose randomly
            this.questions.push(this.getQuestionType1());
        }
    }

    getQuestionType1() {
        //TODO:  generate randomly
        const ORGANISM = "mahuna";
        const CHARACTERISTIC = "boja sjemenke";
        const PARENT1_TYPE = "heterozigot";
        const PARENT2_TYPE = "homozigot";
        const PARENT1_TRAIT = "žuta";
        const PARENT2_TRAIT = "zelena";
        const CHILD_TRAIT = "zelena";
        const INHERITANCE_TYPE = "dominantno/recesivno";

        let q = {question : "", answers : [], correctAnswer : ""};
        q.question = `Za organizam ${ORGANISM}: ako imamo roditelja koji je ${PARENT1_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT1_TRAIT}
                i roditelja koji je ${PARENT2_TYPE} i čije je svojstvo ${CHARACTERISTIC}-${PARENT2_TRAIT},
                koliko će djece (od njih 4) nastalo križanjem ova dva roditelja imati svojstvo ${CHARACTERISTIC}-${CHILD_TRAIT}?
                Tip nasljeđivanja za svojstvo ${CHARACTERISTIC} kod organizma ${ORGANISM} je: ${INHERITANCE_TYPE}.`;

        q.answers = ["0", "1", "2", "3", "4"];
        q.correctAnswer = "2";
        return q;
    }
}