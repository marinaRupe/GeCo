import { ChildOrganismComponent } from '../child-organism/child-organism.component';
import { Component, Input } from '@angular/core';
import { ITrait, IChild, IOrganism } from '../../shared/types';
import { InheritanceService } from "../../inheritance.service";

@Component({
    selector: 'offspring',
    template: require('./offspring.component.html'),
    providers: [InheritanceService]
})
export class OffspringComponent {
    @Input() parent1: IOrganism;
    @Input() parent2: IOrganism;
    @Input() traits1: ITrait[] = [];
    @Input() traits2: ITrait[] = [];
    @Input() organism: string = '';
    @Input() characteristic: string = '';
    private children : IChild[] = [];
    private stats: IStat[] = Array(2);

    constructor(private inheritanceService: InheritanceService) {}
    
    ngOnChanges(changes: any) {
        if (this.parent1.trait1.genotype && this.parent2.trait1.genotype) {
            this.children = this.generateChildren();
            this.setStatistics();
        }
    }

    generateChildren(): IChild[] {
        const isDihybrid = this.traits2.length > 0;
        let char1, char2;
        if (isDihybrid) {
            char1 = this.characteristic.split("+")[0].trim();
            char2 = this.characteristic.split("+")[1].trim();
        } else {
            char1 = this.characteristic;
            char2 = "";
        }
        return this.inheritanceService.generateChildren(char1, char2, this.traits1, this.traits2, this.parent1, this.parent2);
    }

    setStatistics(): void {
        let genotypeStats = {};
        let phenotypeStats = {};
        let childrenCount = this.children.length;
        let isDihybrid = this.traits2.length > 0;

        for (let i = 0; i < childrenCount; i++) {
            let c: IChild = this.children[i];
            let child: IOrganism = c.child;
            if (isDihybrid) {
                let char1 : string = this.characteristic.split("+")[0].trim();
                let char2 : string = this.characteristic.split("+")[1].trim();
                let genotype : string = child.trait1.genotype.allele1 + child.trait1.genotype.allele2
                    + child.trait2.genotype.allele1 + child.trait2.genotype.allele2;
                let phenotype : string = `${char1}-${child.trait1.phenotype} + ${char2}-${child.trait2.phenotype}`;

                genotypeStats[genotype] = c.percentage * childrenCount;
                phenotypeStats[phenotype] = (phenotypeStats[phenotype] || 0) + 1;
            } else {
                let genotype : string = child.trait1.genotype.allele1 + child.trait1.genotype.allele2;
                let phenotype : string = this.characteristic + "-" + child.trait1.phenotype;

                genotypeStats[genotype] = c.percentage * childrenCount;
                phenotypeStats[phenotype] = (phenotypeStats[phenotype] || 0) + 1;
            }
        }
        this.stats[0] = { proportions : "", values: "" };
        this.stats[1] = { proportions: "", values: "" };
        for (let key in genotypeStats) {
            this.stats[0].proportions += genotypeStats[key] + ":";
            this.stats[0].values += key + ":";
        }
        this.stats[0].proportions = this.stats[0].proportions.substring(0, this.stats[0].proportions.length - 1);
        this.stats[0].values = this.stats[0].values.substring(0, this.stats[0].values.length - 1);

        for (let key in phenotypeStats) {
            this.stats[1].proportions += phenotypeStats[key] + ":";
            this.stats[1].values += key + " : ";
        }
        this.stats[1].proportions = this.stats[1].proportions.substring(0, this.stats[1].proportions.length - 1);
        this.stats[1].values = this.stats[1].values.substring(0, this.stats[1].values.length - 3);
    }
}

interface IStat {
    proportions: string;
    values: string;
}