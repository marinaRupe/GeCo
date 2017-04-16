import { Component, Input } from '@angular/core';
import { ITrait } from '../recombinator/recombinator.component';

@Component({
    selector: 'parent-organism',
    template: require('./parent-organism.component.html'),
    styles: [require('./parent-organism.component.css')]
})
export class ParentOrganismComponent {
    @Input() traits: ITrait[] = [];
    trait: ITrait = { fenotype: "", genotype: "", type: "" };
}