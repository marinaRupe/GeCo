import { Component, Input } from '@angular/core';
import { ITrait } from '../../shared/types';
import { InheritanceService } from "../../inheritance.service";
import { ParentOrganismComponent } from '../parent-organism/parent-organism.component';

@Component({
    selector: 'possible-parents',
    template: require('./possible-parents.component.html'),
    styles: [require('./possible-parents.component.css')],
    providers: [InheritanceService]
})
export class PossibleParentsComponent {
    @Input() childGenotype: string;
    @Input() childGenotype2: string;
    @Input() traits1: ITrait[] = [];
    @Input() traits2: ITrait[] = [];
    @Input() characteristic: string;
    private possibleParentsData: ITrait[] = [];

    constructor(private inheritanceService: InheritanceService) { }

    ngOnChanges(changes: any) {
        if ((this.traits2.length === 0 && this.childGenotype) || (this.traits2.length > 0 && this.childGenotype && this.childGenotype2)) {
            this.generatePossibleParentsData();
        }
    }

    generatePossibleParentsData() : void {
        let possibleParentsData = [];
        for (let i = 0; i < this.traits1.length; i++) {
            for (let j = 0; j < this.traits1.length; j++) {
                let parent1Trait1 = this.traits1[i];
                let parent2Trait1 = this.traits1[j];
                
                if (this.childGenotype2 && this.traits2.length > 0) {
                    console.log(this.childGenotype2 && this.traits2);
                    for (let k = 0; k < this.traits2.length; k++) {
                        for (let l = 0; l < this.traits2.length; l++) {
                            let parent1Trait2 = this.traits2[i];
                            let parent2Trait2 = this.traits2[j];

                            let parentData = {
                                parent1: [parent1Trait1, parent1Trait2],
                                parent2: [parent2Trait1, parent2Trait2],
                                percentage: this.getChildPercentage(this.childGenotype,
                                    parent1Trait1.genotype, parent2Trait1.genotype,
                                    parent1Trait2.genotype, parent2Trait2.genotype)
                        };
                            possibleParentsData.push(parentData);
                        }
                    }
                }
                else {
                    let parentData = {
                        parent1: [parent1Trait1, {}],
                        parent2: [parent2Trait1, {}],
                        percentage: this.getChildPercentage(this.childGenotype,
                            parent1Trait1.genotype, parent2Trait1.genotype)
                    };
                    possibleParentsData.push(parentData);
                }
            }
        }
        possibleParentsData.sort((a, b) => (b.percentage - a.percentage));
        this.possibleParentsData = possibleParentsData;
    }

    getChildPercentage(childGenotype: string, parent1Trait1Genotype: string, parent2Trait1Genotype: string, parent1Trait2Genotype: string="", parent2Trait2Genotype: string="") {
        return 0.2;
    }
}