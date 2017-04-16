import { Component, Input } from '@angular/core';
import { ITrait } from '../recombinator/recombinator.component';

@Component({
    selector: 'child-organism',
    template: require('./child-organism.component.html'),
    styles: [require('./child-organism.component.css')]
})
export class ChildOrganismComponent {
    @Input() trait: ITrait;
}