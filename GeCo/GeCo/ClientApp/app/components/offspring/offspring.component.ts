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
    @Input() parent1Genotype2: string;
    @Input() parent2Genotype2: string;
    @Input() traits1: ITrait[] = [];
    @Input() traits2: ITrait[] = [];
    private offspringData : ITrait[] = [];
    private characteristic: string = '';
    private stats: string[] = Array(2);

    constructor(private inheritanceService: InheritanceService) {}
    
    ngOnChanges(changes: any) {
        if (this.parent1Genotype && this.parent2Genotype) {
            this.generateOffspringData();
        }
    }

    generateOffspringData() : void {
        this.offspringData = [];
        const genotypes: string[] = this.generateGenotypes();
        let genotypeStats = {};
        let phenotypeStats = {};

        for (let i = 0; i < genotypes.length; i++) {
            const genotype = genotypes[i];
            const phenotype = this.getPhenotype(genotypes[i]);
            this.offspringData.push({
                genotype: genotype,
                phenotype: phenotype,
                type: this.getType(genotypes[i])
            });

            genotypeStats[genotype] = (genotypeStats[genotype] || 0) + 1;
            phenotypeStats[phenotype] = (phenotypeStats[phenotype] || 0) + 1;
        }
        this.setStatistics(genotypeStats, phenotypeStats);
    }

    setStatistics(genotypeStats : {}, phenotypeStats : {}) : void {
        let temp = this.stats[0] = this.stats[1] = "";
        for (let key in genotypeStats) {
            this.stats[0] += genotypeStats[key] + ":";
            temp += key + ":";
        }
        this.stats[0] = this.stats[0].substring(0, this.stats[0].length - 1) + " " + temp.substring(0, temp.length - 1);

        temp = "";
        for (let key in phenotypeStats) {
            this.stats[1] += phenotypeStats[key] + ":";
            temp += key + ":";
        }
        this.stats[1] = this.stats[1].substring(0, this.stats[1].length - 1) + " " + temp.substring(0, temp.length - 1);
    }

    generateGenotypes(): string[] {
        let genotype1 = this.parent1Genotype;
        let genotype2 = this.parent2Genotype;
        if (this.parent1Genotype2 && this.parent2Genotype2) {
            genotype1 += this.parent1Genotype2;
            genotype2 += this.parent2Genotype2;
        }
        return this.inheritanceService.generateGenotypes(genotype1, genotype2);
    }

    getPhenotype(genotype: string) : string {
        return this.inheritanceService.getPhenotype(this.traits1, genotype);
    }

    getType(genotype: string) : string {
        return this.inheritanceService.getType(genotype);
    }
}