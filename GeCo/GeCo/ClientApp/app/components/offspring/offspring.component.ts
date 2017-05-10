import { ChildOrganismComponent } from '../child-organism/child-organism.component';
import { Component, Input } from '@angular/core';
import { ITrait, IChild, IOrganism, IInheritance, ICharacteristic } from '../../shared/types';
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
    @Input() characteristic: ICharacteristic;
    @Input() inheritanceType : IInheritance;
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
        return this.inheritanceService.generateChildren(this.characteristic, this.inheritanceType, this.traits1, this.traits2, this.parent1, this.parent2);
    }

    setStatistics(): void {
        let genotypeStats = {};
        let phenotypeStats = {};
        const areLinkedGenes = this.inheritanceType.type1 === "vezani geni" && this.inheritanceType.type2 === "vezani geni";
        let childrenCount = areLinkedGenes ? this.children.length * 100 : this.children.length;
        let isDihybrid = this.traits2.length > 0;

        for (let i = 0; i < this.children.length; i++) {
            let c: IChild = this.children[i];
            let child: IOrganism = c.child;
            if (isDihybrid) {
                let char1 : string = this.characteristic.first;
                let char2 : string = this.characteristic.second;
                let genotype : string = child.trait1.genotype.allele1 + child.trait1.genotype.allele2
                    + child.trait2.genotype.allele1 + child.trait2.genotype.allele2;
                let phenotype : string = `${char1}-${child.trait1.phenotype} + ${char2}-${child.trait2.phenotype}`;

                genotypeStats[genotype] = c.percentage * childrenCount;
                phenotypeStats[phenotype] = (phenotypeStats[phenotype] || 0) + 1;
            } else {
                let genotype : string = child.trait1.genotype.allele1 + child.trait1.genotype.allele2;
                let phenotype : string = this.characteristic.first + "-" + child.trait1.phenotype;

                genotypeStats[genotype] = c.percentage * childrenCount;
                phenotypeStats[phenotype] = (phenotypeStats[phenotype] || 0) + 1;
            }
        }
        this.stats[0] = { proportions : "", values: "" };
        this.stats[1] = { proportions: "", values: "" };
        for (let key in genotypeStats) {
            this.stats[0].proportions += Math.round(genotypeStats[key]) + ":";
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