import { ChildOrganismComponent } from "../child-organism/child-organism.component";
import { Component, Input, ContentChildren, QueryList } from "@angular/core";

@Component({
    selector: 'offspring',
    template: require('./offspring.component.html')
})
export class OffspringComponent {
    @Input() parent1Genotype: string = '';
    @Input() parent2Genotype: string = '';
    private offspringData = [];
    private organism: string = '';
    private characteristic: string = '';
    
    ngOnChanges(changes: any) {
        if (this.parent1Genotype !== '' && this.parent2Genotype !== '') {
            this.generateOffspringData();    
        }
    }

    generateOffspringData() {
        this.offspringData = [];
        let genotypes: string[] = this.generateGenotypes(this.parent1Genotype, this.parent2Genotype);

        for (let i = 0; i < genotypes.length; i++) {
            this.offspringData.push({ genotype: genotypes[i], fenotype: this.getFenotype(this.organism, this.characteristic, genotypes[i]) });
        }
    }

    generateGenotypes(genotype1: string, genotype2: string) {
        let genotypes = [];
        for (let i = 0; i < genotype1.length; i++) {
            for (let j = 0; j < genotype2.length; j++) {
                genotypes.push(genotype1[i] + genotype2[j]);
            }
        }
        return genotypes;
    }

    getFenotype(organism : string, trait: string, genotype: string) {
        return "crvena";
    }
}