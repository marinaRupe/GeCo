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
    @Input() trait1: ITrait;
    @Input() trait2: ITrait;
    @Input() characteristic: string;
    @Input() canChange: boolean;
    @Input() sex: string;

    ngOnInit(): void {
        if (this.traits1 === undefined && this.traits2 === undefined) {
            this.traits1 = [];
            this.traits2 = [];
        }
        if (this.canChange) {
            this.trait1 = {} as any;
            this.trait2 = {} as any;
        }
    }

    ngOnChanges(changes: any): void {
        if (this.canChange) {
            this.trait1 = {} as any;
            this.trait2 = {} as any;
        }
    }

    private filterTraitsBySex() {
        let traits1 = [];
        for (let i = 0; i < this.traits1.length; i++) {
            const trait = this.traits1[i];
            if ((this.sex === "male" && trait.genotype.allele2 === "Y") || (this.sex === "female" && trait.genotype.allele2 !== "Y")) {
                traits1.push(trait);
            }
        }
        this.traits1 = traits1;

        let traits2 = [];
        for (let i = 0; i < this.traits2.length; i++) {
            const trait = this.traits2[i];
            if ((this.sex === "male" && trait.genotype.allele2 === "Y") || (this.sex === "female" && trait.genotype.allele2 !== "Y")) {
                traits2.push(trait);
            }
        }
        this.traits2 = traits2;
    }
}