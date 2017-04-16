import { ChildOrganismComponent } from "../child-organism/child-organism.component";
import { Component, Input, ContentChildren, QueryList } from "@angular/core";
import { ITrait } from '../recombinator/recombinator.component';

@Component({
    selector: 'offspring',
    template: require('./offspring.component.html')
})
export class OffspringComponent {
    @Input() parent1Genotype: string = '';
    @Input() parent2Genotype: string = '';
    @Input() traits: ITrait[] = [];
    private offspringData = [];
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
            this.offspringData.push({ genotype: genotypes[i], fenotype: this.getFenotype(this.traits, genotypes[i]), type: this.getType(genotypes[i]) });
        }
    }

    //move to a special file
    generateGenotypes(genotype1: string, genotype2: string) {
        let genotypes = [];
        for (let i = 0; i < genotype1.length; i++) {
            for (let j = 0; j < genotype2.length; j++) {
                genotypes.push(genotype1[i] + genotype2[j]);
            }
        }
        return genotypes;
    }

    //move to a special file
    getFenotype(traits: ITrait[], genotype: string) { 
        let reversedGenotype = genotype[1] + genotype[0];
        for (let i = 0; i < traits.length; i++) {
            if (genotype === traits[i].genotype || reversedGenotype === traits[i].genotype) {
                return traits[i].fenotype;
            }    
        }
        return '';
    }

    //move to a special file
    getType(genotype: string) {
        const HOMOZYGOTE = 'Homozigot';
        const HETEROZYGOTE = 'Heterozigot';

        if (genotype.length === 2) {
            if (genotype[0] === genotype[1]) return HOMOZYGOTE;
            else return HETEROZYGOTE;
        }
        else if (genotype.length === 4) {
            return 'TODO';
        }
    }
}