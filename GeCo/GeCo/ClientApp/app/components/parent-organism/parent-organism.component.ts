import { Component, Input } from '@angular/core';

@Component({
    selector: 'parent-organism',
    template: require('./parent-organism.component.html'),
})
export class ParentOrganismComponent {
    @Input() genotype: string = "Aa";
    @Input() fenotype: string = "roza";
}