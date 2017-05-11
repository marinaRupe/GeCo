import { Component, OnInit } from '@angular/core';
import { GeneticDataService } from '../../genetic-data.service';
import { ExamService } from './exam.service';
import { IExamQuestion } from "../../shared/types";

@Component({
    selector: 'exam',
    template: require('./exam.component.html'),
    providers: [ExamService]
})
export class ExamComponent {
    private testStarted: boolean;
    private showResults: boolean;
    private examGenerating: boolean;
    private questions: IExamQuestion[];
    private correctAnswers: number;
    private numberOfQuestions: number;

    //constructor(private geneticDataService: GeneticDataService) { }
    constructor(private examService: ExamService) { }

    ngOnInit() {
        this.testStarted = false;
        this.showResults = false;
        this.examGenerating = false;
        this.questions = [];
        this.correctAnswers = 0;
        this.numberOfQuestions = 10;
    }

    start() {
        this.testStarted = false;
        this.showResults = false;
        this.examGenerating = true;
        this.questions = [];
        this.generateExam();
    }

    stop() {
        this.showResults = false;
        this.testStarted = false;
        this.questions = [];
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
        this.examService.generateExam(this.numberOfQuestions).then((result) => {
            this.questions = <IExamQuestion[]>result;
            this.examGenerating = false;
            this.testStarted = true;
        });
    }
}