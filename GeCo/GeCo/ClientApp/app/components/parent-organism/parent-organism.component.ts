import { Component, Input, OnChanges } from '@angular/core';
import { ITrait } from "../../shared/types";

@Component({
    selector: 'parent-organism',
    template: require('./parent-organism.component.html'),
    styles: [require('./parent-organism.component.css')]
})
export class ParentOrganismComponent implements OnChanges {
    @Input() traits: ITrait[] = [];
    trait: ITrait = { fenotype: "", genotype: "", type: "" };

    ngOnChanges(changes: any): void {
        this.trait = { fenotype: "", genotype: "", type: "" };
    }
}