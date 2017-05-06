import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ITrait } from "../../shared/types";

@Component({
    selector: 'child-organism',
    template: require('./child-organism.component.html'),
    styles: [require('./child-organism.component.css')]
})
export class ChildOrganismComponent implements OnInit, OnChanges {
    @Input() traits1: ITrait[];
    @Input() traits2: ITrait[];
    @Input() trait1: ITrait;
    @Input() trait2: ITrait;
    @Input() characteristic: string;
    @Input() canChange: boolean;

    ngOnInit() {
        if (this.traits1 === undefined && this.traits2 === undefined) {
            this.traits1 = [];
            this.traits2 = [];
        }
        if (this.canChange) {
            this.trait1 = { phenotype: "", genotype: "", type: "" };
            this.trait2 = { phenotype: "", genotype: "", type: "" };
        }
    }

    ngOnChanges(changes: any): void {
        if (this.canChange) {
            this.trait1 = { phenotype: "", genotype: "", type: "" };
            this.trait2 = { phenotype: "", genotype: "", type: "" };
        }
    }
}