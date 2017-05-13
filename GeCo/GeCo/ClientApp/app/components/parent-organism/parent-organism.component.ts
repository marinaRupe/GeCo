import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ITrait, IInheritance, ICharacteristic } from "../../shared/types";
import { SEX_CHROMOSOMES_INHERITANCE, MALE_SEX_CHROMOSOME } from '../../shared/constants';

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
    @Input() characteristic: ICharacteristic;
    @Input() inheritanceType : IInheritance;
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

    private filterTraitsBySex(sex, traits, traitsNumber) {
        if (traits === undefined || this.inheritanceType === undefined) return [];
        if (this.inheritanceType["type" + traitsNumber.toString()] === SEX_CHROMOSOMES_INHERITANCE) {
            let traitsTemp: ITrait[] = [];
            for (let i = 0; i < traits.length; i++) {
                if ((sex === "male" && traits[i].genotype.allele2 === MALE_SEX_CHROMOSOME) ||
                    (sex === "female" && traits[i].genotype.allele2 !== MALE_SEX_CHROMOSOME)) {
                    traitsTemp.push(traits[i]);
                }
            }
            return traitsTemp;
        } else {
            return traits;
        }
    }
}