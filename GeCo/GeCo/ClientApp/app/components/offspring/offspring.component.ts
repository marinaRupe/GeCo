import { ChildOrganismComponent } from '../child-organism/child-organism.component';
import { Component, Input } from '@angular/core';
import { ITrait } from '../../shared/types';
import { InheritanceService } from "../../inheritance.service";

@Component({
    selector: 'offspring',
    template: require('./offspring.component.html'),
    providers: [InheritanceService]
})
export class OffspringComponent {
    @Input() parent1Genotype: string;
    @Input() parent2Genotype: string;
    @Input() traits1: ITrait[] = [];
    @Input() traits2: ITrait[] = [];
    private offspringData : ITrait[] = [];
    private characteristic: string = '';

    constructor(private inheritanceService: InheritanceService) {}
    
    ngOnChanges(changes: any) {
        console.log(this.parent1Genotype);
        if (this.parent1Genotype && this.parent2Genotype) {
            this.generateOffspringData();    
        }
    }

    generateOffspringData() : void {
        this.offspringData = [];
        let genotypes: string[] = this.generateGenotypes();

        for (let i = 0; i < genotypes.length; i++) {
            this.offspringData.push({
                genotype: genotypes[i],
                phenotype: this.getFenotype(genotypes[i]),
                type: this.getType(genotypes[i])
            });
        }
    }

    generateGenotypes() : string[] {
        return this.inheritanceService.generateGenotypes(this.parent1Genotype, this.parent2Genotype);
    }

    getFenotype(genotype: string) : string {
        return this.inheritanceService.getFenotype(this.traits1, genotype);
    }

    getType(genotype: string) : string {
        return this.inheritanceService.getType(genotype);
    }
}