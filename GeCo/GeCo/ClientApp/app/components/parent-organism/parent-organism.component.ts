import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ITrait } from "../../shared/types";

@Component({
    selector: 'parent-organism',
    template: require('./parent-organism.component.html'),
    styles: [require('./parent-organism.component.css')]
})
export class ParentOrganismComponent implements OnInit, OnChanges {
    @Input() traits1: ITrait[];
    @Input() traits2: ITrait[];
    trait1: ITrait;
    trait2: ITrait;

    ngOnInit(): void {
        this.traits1 = [];
        this.traits2 = [];
        this.trait1 = { phenotype: "", genotype: "", type: "" };
        this.trait2 = { phenotype: "", genotype: "", type: "" };
    }

    ngOnChanges(changes: any): void {
        this.trait1 = { phenotype: "", genotype: "", type: "" };
        this.trait2 = { phenotype: "", genotype: "", type: "" };
    }
}