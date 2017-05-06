import { Component, Input } from '@angular/core';
import { ITrait, IParents } from '../../shared/types';
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
    private possibleParentsData: IParents[] = [];

    constructor(private inheritanceService: InheritanceService) { }

    ngOnChanges(changes: any) {
        if ((this.traits2.length === 0 && this.childGenotype) || (this.traits2.length > 0 && this.childGenotype && this.childGenotype2)) {
            this.generatePossibleParentsData();
        }
    }

    generatePossibleParentsData(): void {
        let char1, char2;
        if (this.traits2.length > 0) {
            char1 = this.characteristic.split(" + ")[0].trim();
            char2 = this.characteristic.split(" + ")[1].trim();
        } else {
            char1 = this.characteristic;
            char2 = "";
        }
        let possibleParentsData = this.inheritanceService
            .getParentsForChild(char1, this.traits1, char2, this.traits2, this.childGenotype, this.childGenotype2);
        possibleParentsData.sort((a, b) => (b.percentage - a.percentage));
        this.possibleParentsData = possibleParentsData;
    }

    getChildPercentage(childGenotype: string, parent1Trait1Genotype: string, parent2Trait1Genotype: string, parent1Trait2Genotype: string="", parent2Trait2Genotype: string="") {
        return 0.2;
    }
}